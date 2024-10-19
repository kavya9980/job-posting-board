import React, { useState } from 'react';
import axios from 'axios';

const JobPost = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('');

    const handlePostJob = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/job', {
                jobTitle,
                jobDescription,
                experienceLevel,
            });
            alert('Job posted successfully!');
        } catch (error) {
            console.error('There was an error posting the job!', error);
            alert('Job posting failed!');
        }
    };

    return (
        <form onSubmit={handlePostJob}>
            <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Job Title" required />
            <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Job Description" required />
            <input type="text" value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)} placeholder="Experience Level" required />
            <button type="submit">Post Job</button>
        </form>
    );
};

export default JobPost;