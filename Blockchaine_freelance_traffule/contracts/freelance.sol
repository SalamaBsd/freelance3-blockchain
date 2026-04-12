// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
contract Freelance {
 
    struct Job {
        uint256 id;
        address client;
        address freelancer;
        string title;
        string description;
        uint256 amount;
        bool accepted;
        bool completed;
    }
 
    Job[] public jobs;
 
    event JobPosted(uint256 id, address client, string title, uint256 amount);
    event JobAccepted(uint256 id, address freelancer);
    event JobCompleted(uint256 id);
 
    // Client posts a job and locks ETH
    function postJob(string memory _title, string memory _description)
        external payable {
        require(msg.value > 0, 'Must include payment');
        jobs.push(Job({
            id: jobs.length,
            client: msg.sender,
            freelancer: address(0),
            title: _title,
            description: _description,
            amount: msg.value,
            accepted: false,
            completed: false
        }));
        emit JobPosted(jobs.length - 1, msg.sender, _title, msg.value);
    }
 
    // Freelancer accepts a job
    function acceptJob(uint256 _jobId) external {
        Job storage job = jobs[_jobId];
        require(!job.accepted, 'Already accepted');
        require(job.client != msg.sender, 'Client cannot self-accept');
        job.freelancer = msg.sender;
        job.accepted = true;
        emit JobAccepted(_jobId, msg.sender);
    }
 
    // Client approves work -> freelancer gets paid
    function approveJob(uint256 _jobId) external {
        Job storage job = jobs[_jobId];
        require(msg.sender == job.client, 'Only client can approve');
        require(job.accepted, 'Not accepted yet');
        require(!job.completed, 'Already completed');
        job.completed = true;
        payable(job.freelancer).transfer(job.amount);
        emit JobCompleted(_jobId);
    }
 
    // Return all jobs
    function getAllJobs() external view returns (Job[] memory) {
        return jobs;
    }
}
