## Milestone 1 (7th April, 5pm)

### Dataset

For this project, we will use WhatsApp chats, including messages and metadata, as well as the contacts and the architecture of groups, as our dataset.
Using WhatsApp data as a resource puts us in a unique position: we can customise the dataset and visualisation for each user on our website.
Indeed, with two billion monthly active users, WhatsApp is one of the leading social networks for messaging.

To this end, we have built a web system that acts as a client (like What's app web) for the WhatsApp API.
The user simply scans the QR code displayed.
As soon as the user is logged in, our web application retrieves locally (in the user's browser) the user's WhatsApp data for the last three years. As long as the user is logged in, new messages flow in and are integrated into our dynamic visualisations.

Several layers in several languages are needed to achieve such results.
We will focus on the format of the data received by the javascript layer, after pre-processing and formatting in the lower layers, as this is the format that will be used as a basis for the visualisations.

We have three types of application messages that transmit new data. The first is the message, here is its architecture:
```
<message_id> : 
{
  chat: <chat_id>,
  id: <message_id>
  message: <message_text>
  sent-by: <contact_id>
  timestamp: <date_time>
}
```
Here the `chat_id` can either be a `contact_id` for private chats, or a `group_id` if the message was sent to a group chat. 
The second one is a contact message:
```
<contact_id> : 
{
  id: <contact_id>
  status: <conatct_status>
  name: <contact_name>
  avatar: <link_to_avatar_picture>
}
```
The third and final type of application message received by javascript layer is describing a chat:
```
<group_id> : 
{
  avatar: <link_to_avatar_picture>
  name: <chat_name>
  owner_id: <chat_owner_id>
  participants: [<particpant_id>, ..]
  topic: <chat_topic>
}
```
Both the `chat_owner_id` and the `particpant_id`s are again `contact_id`s to link them back to actual people.

Our dataset is therefore a collection of tens of thousands (depending on the user's network/activity) of such messages, and hundreds of groups and contacts.

### Problematic

We deeply believe that WhatsApp data is a goldmine (no wonder Meta is funding it even though WhatsApp doesn't benefit directly).
Equipped with our data science and data visualization tools, we aim to extract and present the valuable knowledge hidden in this massive amount of data.
Our website will present actionable insights like a jeweller would present gold rings, without the customer having to get their hands dirty. 

WhatsApp is used to communicate with family, friends, but also with the professional network.
Indeed, communication on WhatsApp is so easy that many people are abandoning email.
Today, many organisations and freelancers (including, unofficially, the Swiss army) rely on WhatsApp to carry out their daily activities.

The main goal of our visualisations is to give the user an overview of his (contact) network.
A good understanding of the landscape of your connections allows you to maintain and exploit them. We plan to build a visualisation that answers the following questions.
Who is in your network and how close are you to them? Who is connected to whom?
In what context do you know someone? 

Once the user has a good level of understanding of their network, we want to allow them to dig deeper into a specific contact/group.
What are the main topics discussed?
What time of day (or night) is the person most responsive?
What is the typical language used to communicate with this person? 

Easy access to these answers will undoubtedly facilitate the management of a professional (or even friendly) network.

### Exploratory Data Analysis

Pre-processing we have to do before being able to compute statistics about the messages, is to transform the messages for each discussion the user has, we have to parse the message to a common message structure that would consist of the message content, the name of the contact, the avatar, the status, the message id, and group information.

Some statistics (which are user dependent) we have are:
  - The number of message
  - The number of contacts
  - The number of groups
  - The number of words
  - The average number of messages per contact
  - The average number of words per message sent per contact
  - The average length of messages per contact
  - Wordstock/Emojies in use per chat 
  - The average time the messages were sent at, or also as a per weekday graph
  - Top 3 most talked to people
  - Top languages spoken (per chat/per contact)


### Related work

Because for our approach the data will be new/different for each user, we can not compare our dataset directly to existing ones.
Nevertheless, Whatsapp chat analyzers already exist, some of them are [WhatsAnalyze](https://whatsanalyze.com/), [ChatAnalyzer](https://chatanalyzer.moritzwolf.com/), [DoubleText](https://doubletext.me/whatsapp/) and [Chatilyzer](https://chatilyzer.com/).
Our approach is different from all of these as we process the messages on the fly, building the vizualization progressively as we receive them from WhatsApps servers and parse the messages.
This enables the user to see in real time the statistics change when using WhatsApp and also does away with the necessary step of backuping the chats.
This is due to the fact that existing WhatsApp chat analyzers need an uploaded backup of all chats, whereas in our approach the user just scans the QR code like they would for WhatsApp Web.

We took inspiration in graphs that would simulate the dynamics in populations and how information would spread out in these.
Some pitcorial examples are [this](https://cambridge-intelligence.com/wp-content/uploads/2020/07/6.0-PR-feature.png) and [this](https://cvo22.files.wordpress.com/2014/03/inmap.gif).
As it is the conventional manner to visualize communications between human beings, we wanted to keep such a graph as the basis for our visualizations.
Other inspirations we take from the above mentioned already existing chat analyzers.
