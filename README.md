# archive-frontend

## Technology Stacks & Configuration
Prerequisites
-------------
- [MongoDB](https://www.mongodb.com/download-center/community)
- [Node.js v12.13](http://nodejs.org)
- Command Line Tools
- <img src="http://deluge-torrent.org/images/apple-logo.gif" height="17">&nbsp;**Mac OS X:** [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12) (or **OS X 10.9+**: `xcode-select --install`)
- <img src="http://dc942d419843af05523b-ff74ae13537a01be6cfec5927837dcfe.r14.cf1.rackcdn.com/wp-content/uploads/windows-8-50x50.jpg" height="17">&nbsp;**Windows:** [Visual Studio](https://www.visualstudio.com/products/visual-studio-community-vs) OR [Visual Studio Code](https://code.visualstudio.com) + [Windows Subsystem for Linux - Ubuntu](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
- <img src="https://lh5.googleusercontent.com/-2YS1ceHWyys/AAAAAAAAAAI/AAAAAAAAAAc/0LCb_tsTvmU/s46-c-k/photo.jpg" height="17">&nbsp;**Ubuntu** / <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Logo_Linux_Mint.png" height="17">&nbsp;**Linux Mint:** `sudo apt-get install build-essential`

Technology Stacks
-----------------
- React
- NextJS
- Material UI

Getting Started
----------------

The easiest way to get started is to clone the repository:

```bash
# Get the latest snapshot
git clone https://gitlab.informatika.org/if3250-2020-archive-2/archive-frontend.git

# Change directory
cd archive-frontend

# Install NPM dependencies
npm install

# Then simply start your app
node server.js
```

**Warning:** If you want to use login feature, you will need to download [ngrok](https://ngrok.com/).
You must start ngrok after starting the project.
```bash
# start ngrok to intercept the data exchanged on port 3000
./ngrok http 3000
```
Next, you must use the https URL defined by ngrok, for example, `https://archive.ngrok.io`
Change the `config/index.js` at `archive-frontend` and `archive-backend`
