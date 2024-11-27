const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Path to saved selections file
const SELECTIONS_FILE = path.join(__dirname, 'data', 'saved_selections.json');
const OPTIONS_FILE = path.join(__dirname, 'data', 'clothing_options.json');

// Ensure data directory exists
const ensureDataDirectory = async () => {
    try {
        await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
    } catch (error) {
        console.error('Error creating data directory:', error);
    }
};

// Default route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Read clothing options
app.get('/api/clothing-options', async (req, res) => {
    try {
        const rawData = await fs.readFile(OPTIONS_FILE, 'utf8');
        res.json(JSON.parse(rawData));
    } catch (error) {
        res.status(500).json({ error: 'Could not read clothing options' });
    }
});

// Get saved selections
app.get('/api/selections', async (req, res) => {
    try {
        // Ensure file exists
        try {
            await fs.access(SELECTIONS_FILE);
        } catch {
            // If file doesn't exist, create an empty array
            await fs.writeFile(SELECTIONS_FILE, JSON.stringify([], null, 2));
        }

        const rawData = await fs.readFile(SELECTIONS_FILE, 'utf8');
        res.json(JSON.parse(rawData));
    } catch (error) {
        res.status(500).json({ error: 'Could not read saved selections' });
    }
});

// Save new selection
app.post('/api/selections', async (req, res) => {
    try {
        // Read existing selections
        let selections = [];
        try {
            const rawData = await fs.readFile(SELECTIONS_FILE, 'utf8');
            selections = JSON.parse(rawData);
        } catch {
            // If file doesn't exist, start with an empty array
        }

        // Add new selection with timestamp
        const newSelection = {
            ...req.body,
            timestamp: new Date().toISOString()
        };
        selections.push(newSelection);

        // Write back to file
        await fs.writeFile(SELECTIONS_FILE, JSON.stringify(selections, null, 2));

        res.json(newSelection);
    } catch (error) {
        console.error('Error saving selection:', error);
        res.status(500).json({ error: 'Could not save selection' });
    }
});

// Clear all selections
app.delete('/api/selections', async (req, res) => {
    try {
        await fs.writeFile(SELECTIONS_FILE, JSON.stringify([], null, 2));
        res.json({ message: 'All selections cleared' });
    } catch (error) {
        res.status(500).json({ error: 'Could not clear selections' });
    }
});

// Initialize and start server
const startServer = async () => {
    await ensureDataDirectory();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();
