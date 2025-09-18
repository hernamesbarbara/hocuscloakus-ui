# HocusCloakus UI / Front end web app

### Overview

HocusCloakus is a simple web application that lets users view two files at the same time so that they can easily see the contents of both, compare them visually, and easily see and understand what the differences are. 

Files will be in markdown or in json. 

Json files can be in two json dialects: Docling Json or Lexical Json.

#### Layout

A simple two column layout. each column has a markdown editor. 

The two editors are independent from one another. The user can type in the left one then click to the right one and start typing there so that both files are editable. it should look a little bit like github's commit diff UI which also has 2 text boxes side by side with clean borders. but instead of showing diffs it's just two markdown editors.


#### Sample data

Sample data to use for placeholder content in each of the two editors is in the repo here: 

```bash
tree data/
data/
├── json
└── md
    ├── email.masked.md
    └── email.original.md

```


The subdirectory denotes the type of sample data: data/json/ for all json files and data/md/ for all markdown files. 

Use email.original.md for the left markdown editor's default content and use email.masked.md for the right editor's content.

#### Dev tools / Stack

Use the following tools:
- Vite.js
- React
- Material UI

Keep it super simple

#### Initial setup

This project isn't checked into a git repo yet. 

The first thing you should do is create a git repo with a .gitignore file relevant for the tools we are using in our stack. Ignore the .code-workspace settings file. we don't need that in the repo.

Create a placeholder README.md for the repo.

Make the initial commit and then check out a feature branch that we can begin working on. 
