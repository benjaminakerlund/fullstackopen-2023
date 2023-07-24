/** teardown.js
 * This file is added to fix the following problem:
    * "Jest did not exit one second after the test run has completed."
    
 * This is likely caused by Mongoose version 6.x and does not appear in v. 5.x or 7.x 
 * In my case, I am running Mongoose 7.3.2 so this was not an issue
 */


module.exports = () => {
    process.exit(0)
}