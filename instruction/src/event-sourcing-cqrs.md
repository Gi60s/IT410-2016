# Event Sourcing and CQRS

<hr>

## Review Website

You have a system where products have been added by an administrator and guests can create accounts and review the products, leaving both a rating and comments. Once a user has submitted a rating they can edit or delete it as well.

The database table storing reviews has four columns:

* user_id - The ID of the user who submitted the review.
* product_id - The ID of the product that is being reviewed.
* rating - A number from 1 to 5 representing rating.
* review - A text value with the review.

#### Question

What situations could occur that would exploit weaknesses in this data structure?

<hr>

#### Answer

We can't track changes. We have no history. Users could write a review with malicious content and then change it or delete it before system administrators could see it.

If you have an update or delete for your database then you've made the decision to destroy data.

#### Question

How could we fix the weaknesses of not having history?

<hr>

#### Answers

**Option 1**

We could add columns to the table that track changes. Then every time we try to load the review we'd have to load the very latest review. This table would require that we add the columns:

* update_time - The time that the review was last updated.
* deleted - A flag that indicates if the post was deleted.

The down side of this is that whenever we wanted to get the review value we'd have to search the table for the last review edit. This would eventually cause slow downs as the table grew in size.

**Option 2**

We could create a second table that keeps track of history and we let the first table maintain current state only.

The down side of this is that if we change the columns in the first table we also have to make the same changes to the second table. We'd have to create database migration scripts for both the original table and the history table.

#### Question

You've made some changes to the database structure and have a script that runs and migrates the database data to the new format. You also keep a copy of the data before the migration in case you need to roll back changes.

You run the migration script, everything works, users are adding reviews. Suddenly you realize that you have an error and need to roll back.

Can you and should you write a migration script that takes the data from it's current state and moves it into the old schema without losing data?

<hr>

#### Answer

Whether you can actually write a reverse migration script is dependent on the situation. Either way you're put into a non-ideal situation.

<hr>

## Rethinking Data

As application developers we are most familiar with mutable databases, but there may be a better solution in many instances.

### What is Event Sourcing?

1. You store every event that occurs into the database.
2. You never delete any event.
  * Disk space is not a concern because disc space also follows Moore's Law.
  * Maybe use a WORM (write once read many) drive.
3. You model every event after a behavior.

#### Example

If you have a shopping cart and your using event sourcing, your experience might look like this:

1. Add item X to cart
2. Add item Y to cart
3. Add item Z to cart
4. Remove item Y from cart
5. Checkout

#### Question

How is that different than: "Checkout with items X and Z in cart"?

<hr>

#### Answer

The end result is the same, but we've lost valuable data.

Your boss comes to you and says, "I'd like to start tracking what items are removed from a user's cart before checkout."

1. If you're not storing events then you'll have to start tracking that information from this point forward.
2. If you were using event sourcing then you can track that information retroactively. Think: ***Time Travel***

#### Question

What other things could you retroactively look up in this shopping application if you used event sourcing?

<hr>

## Bank Account Application

#### Questions

1. What are the behaviors that we need to store as events for a user's account?
2. How do we determine what the balance on an account is?
3. How do you handle incorrect events? Ex: Accidentally transferred $100 to your friend's account when you meant to transfer $10.
3. What happens if an event is deleted?

<hr>

#### Answers

1. **What are the behaviors that we need to store as events for a user's account?**

  * Open account
  * Close account
  * Add money to account
  * Remove money from account
  * Transfer money from account
  * Transfer money to account

2. **How do we determine what the balance on an account is?**

  Run through all transactions, add everything up and get the result.

3. **How do you handle incorrect events?**

  Add an undo event then add the correct event.

4. **What happens if an event is deleted?**

  Your account balance will be wrong. This is a pretty critical application and you should probably have a WORM drive or some other assurance that data cannot be modified.

#### Question

We may not want to go through every single transaction on an account to determine the accounts balance. Is there a better way?

<hr>

## Projections and Snapshots

**Projection**

* A set of stateful data that is built from the events and the last snapshot (if there is one).
* It is built to contain specifically the data that you want, nothing more and nothing less.
* Cannot be modified and still be the same projection. It becomes a new projection.

**Snapshot**

* A set of stateful data that is built from events, intended as a shortcut to build projections.
* Allows a projection to be built without having to start from the very beginning of the events.
* How often snapshots are created is based on the needs of the application.

### Bank Account Application

* You could create a snapshot of an account balance.
* You may want to create a daily snapshot.
* Whenever a query occurs for the current account balance you can build a projection from the snapshot and any events that came after it.

<hr>

### Multiplayer Online Video Game

You are build a multiplayer online fighting game (like Smash Bros).

#### Questions

1. How do you get player position, health, action taken (move, punch, jump, etc) to other players?
2. How can you enable replays?

<hr>

#### Answers

1. **How do you get player position, health, action taken (move, punch, jump, etc) to other players?**

  You don't send all the data in togeteher (position, health, action), you instead send the events: (player pushed button X, player pushed direction right, player released button X) along with time data for when they occurred. Each system individually accepts events from the server as if accepted locally and acts on them.

2. **How can you enable replays?**

  Simply have he system play through everyone's events in real time.

There is no other realistic way to do this. Storing all data (position, health, action) per sub-second is wasteful and overly complex.

If you play a game with replay you won't often find a rewind button even if there is a fast forward button because the state of the game at any given moment is dependent on the events that proceed it.

<hr>

### Big High Performance Data

You are developing a website just like twitter. It needs to have virtually no lag when you add a post and virtually no lag when you are looking up posts by user, hashtag, date, etc.

This website receives 7,000 posts per second.

[Twitter Statistics](http://www.internetlivestats.com/one-second/#tweets-band)

#### Question

1. How do you keep performance high for writing and reading?

<hr>

#### Answer

1. **How do you keep performance high for writing and reading?**

  * Each post is an event.
  * You analyze each event and update snapshots and projections for latest posts, hashtags, etc. based on the post.
  * Queries for the data use projects that area already built.

<hr>

## CQRS

* Stands for **Command Query Responsibility Segregation**.
* Commands are issued to one server.
  * Because they are added to the database sequentially it can happen very quickly.
  * The command server sends events out to other servers that build projections and snapshots.
* Queries are handled by another server.
  * This server has one or more stored projections.
  * There isn't much data to sift through to get the query result.
  * It is high performance.

#### Questions

1. What about eventual consistency? Projections will not be up to date until the latest commands event's have reached the projection servers.
2. Can you scale a command server, and if so, how?
3. Can you scale a projection server, and if so, how?

<hr>

#### Answers

1. **What about eventual consistency? Projections will not be up to date until the latest commands event's have reached the projection servers.**

  Mutable databases also have eventual consistency unless your setting a pessimistic lock on all queries.

  Additionally, commands must happen immediately to prevent data loss, but it is very rare that queries will do damage if not immediately up to date.

2. **Can you scale a command server, and if so, how?**

  Yes you can scale it. You can set up a load balanced array of servers, but if a projection needs to be made from scratch then it will need to get events from every command server.

3. **Can you scale a projection server, and if so, how?**

  Yes you can scale it. You can set up a load balanced array of servers. Each server will be eventually consistent in its own time.

<hr>

## Review Application Revisited

You have a system where products have been added by an administrator and guests can create accounts and review the products, leaving both a rating and comments. Once a user has submitted a rating they can edit or delete it as well.

The command database will get events:

* Review added with rating.
* Review edited with rating.
* Review removed

The query database will:

* Build a projection for each product. The projection will have a list of all of the reviews and the average review rating.

Issues we no longer have to worry about:

* We now have history, so that isn't an issue.
* If the database structure changes we just make a new projection.
* If we need to roll back, we just build the old projection, including the events added after the software update.

<hr>

## Event Sourcing the UI

If you record every even the user takes on the UI and a bug is encountered then it is easy to replay the events to see what occurred.

You can also replay events for testing code rollout.