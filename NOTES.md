## Installation

### Notes

`npm i` caused some issues when trying to install. NestJs typeorm had a pinned dependency, and typeorm-seeding is outdated and needs an update. 

That or you can run `npm install --legacy-peer-deps`. 

`npm install --legacy-peer-deps` appears to have worked for now, but not without warnings of deprecation. Keeping an eye on it in case there are futher issues. In the real world, I'd make sure a separate ticket is raised to deal with it. 

Also a lot of critical vulnerabilities within this repo. Unsure if this is part of the test or if it is just the nature of test repositories being used infrequently. Noting and moving onto the tasks for now. 

Docker has not been easy to get running. Again, not sure if intentional.

*Supported by claude and the internet for debugging what is going on. 

First, the postgres image pull was failing. Most likely cause was the connection to the image was dropping mid-download. I tried several times but it wasn't flakey, it was persistent. Instead, I took the suggestion to uncheck the "Use containerd for pulling and storing images" option in docker settings. This was successful.

Next the build was failing on the `apt-get update`. The cause of this was a base image `node:lts-gallium` was built on Debian buster, which is at end-of-life. The package repositories have been pulled from standard methods and instead throw 404s. 

apt-get update -y wasn't actually needed as nothing installs apt packages. It was manually removed apt-get update -y from Dockerfile.dev and the build then passed.

Installation was not easy given the number of issues that arose just from trying to get this repository running. At some points during the notes I muse if thing were on purpose, but github shows that the repo hasn't had a commit in over 2 years. Therefore I've concluded, the issues I am facing are genuine and not part of the test.


