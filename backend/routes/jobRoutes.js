const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Post a job
router.post('/', (req, res) => {
    const { jobTitle, jobDescription, experienceLevel, endDate, companyId } = req.body;
    const query = 'INSERT INTO jobs (jobTitle, jobDescription, experienceLevel, endDate, companyId) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [jobTitle, jobDescription, experienceLevel, endDate, companyId], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error posting job', error: err });
        res.status(201).json({ message: 'Job posted successfully' });
    });
});

module.exports = router;