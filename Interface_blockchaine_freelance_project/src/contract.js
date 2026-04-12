export const CONTRACT_ADDRESS = '.....';

export const ABI = [
  'function postJob(string memory _title, string memory _description) external payable',
  'function acceptJob(uint256 _jobId) external',
  'function approveJob(uint256 _jobId) external',
  'function getAllJobs() external view returns (tuple(uint256 id, address client, address freelancer, string title, string description, uint256 amount, bool accepted, bool completed)[])'
];