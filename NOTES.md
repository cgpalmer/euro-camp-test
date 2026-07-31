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


## Task 1

I am going to split this section up into topics and group them that way.

### Primary Keys

The 'id' in each table has a primary key constraint on it which is good. This ensures the uniqueness of a key. However, it is down as a varchar, when there is an option to use postgres' native UUID. Looking into the values on the table, the 'id' is stored as a UUID anyway. Varchar is less space-efficient and slightly slower to index than the native UUID type. These performance gains would be beneficial at scale and would be a welcome improvement, especially as each table has an index on the 'id' column. 

### Varchar vs Text

Some fields are varchars, such as the descriptions or the comments. Depending on the use-case, TEXT type could be considered more appropriate. If the varchar has a limit of characters, and the value crosses it, then it'll just truncate the value. This would not be productive for comments for example. 

### Foreign Keys

I would add foreign keys to the booking table on users and parcs. This would allow each booking to be connected in a one-to-one relationship with a user, or a parc. Foreign keys enforce the connection to the other tables and will reject any incorrect values. This is much more beneficial at this point in the journey as oppose to the users receiving an error when they cannot retrieve their booking because the parc associated does not exist. 

### Indexing

I would add indexes to the booking table to search for bookings based on parc id or user id. These will be very common use-cases, for example in 'My Account' you might want to see your history of bookings. Indexing on your user id will create a siginificantly quick query that going through the whole table looking. 

### New tables

I would look into creating a new table for comments on the booking. If only one comment is permitted, then this the current set-up is fine but if there are multiple, they would be forced to be stored as a single string. For a new table, I'd include `id, comment, user(fk), booking(fk)` and I would run indexes on `id, user, booking`, as they are hte most likely queries to be needed. 

This would allow multiple comments per booking or user and provide a much more flexible approach for displaying and manipulating the comments. 

### Additional constraints

I would change the use of varchar to date/timestamp. Using dates are a varchar can cause numerous issues with sorted, as they will not behave in a way humans would expect. There is no guarantee that the earliest dates will be shown first if you sort on a varchars with a formats of '06-20-2025' for example.

## Task 2

### Agentic coding

The world is only talking about AI at the moment and it dominates the conversation in most place, but specifically our world software development. 

AI has been widely adopted to be used for debugging, code completion and documentation, through the use of Co-pilot or dedicated IDEs such as Cursor, which offer all the latest models but also their own models. 

Beyond the wider adoption, some are using AI to run agentic coding - the full cycle of development from ticket ingestion to implementation to code review. This fully autonomous pipeline has undoubtedly raised a lot of questions and two I will talk about here: Cost and Quality. 

For reference, I will be using Claude and Anthropic as the example.  

Cost has been the real limitation for developers, either through burning tokens or through literal £s spent using the API. This has caused development to adapt and think carefully about how they approach their workflows. Many have resorted to a understand -> plan -> approve -> write -> verify (or some variation of these words.)

In short, they use the more expensive models to understand the current code, the ask of the ticket and the potential solutions and then produce a plan which is debated and approved by humans. Once approved, the agents are carrying out clearly written plans and so the cheaper models such as Sonnet or Haiku, are able to execute the plan and produce the code.

This model, including a mix of human and AI reviewing, allows full ownership of the code to still sit with humans and reduces costs to allow for more work per subscription. 

It's a desired blend because it also helps to address the other issue: Quality.

Quality is the single biggest problem with agentic coding today. Without an excellent code base to model itself on, the agents will not produce high-quality work. They seldom self-correct by looking at new and fresh documentation and they often will expand scope-creep in the name 'coding best practice', turning your one-line bug fix into a 4 page refactor. 

By having regular intervals with the plans and the reviews, it keeps humans in control of the direction and allows for potential hallucinations/scope creep to be caught early on. Further to that, any skills that are designed to write plans and carry out code, can be regularly update by any issues found at the human review stages. Over time, the agents should behave more in line with your desired coding style and quality. 

Agentic coding is still in its infancy and the world is right to be cautious of its limitations. The above approach, at this time, addresses both the major concerns with working with AI and is as close to autonomous as developers can get, without compromising quality code - something we all care a lot about. 

