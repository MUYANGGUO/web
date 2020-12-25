---
layout: post
title:  "CyberLeet, a Three.js + React, cyberpunk style visualization for leetcode problems -- made for fun"
date:   2020-12-25
excerpt: "Built with the native three.js and the create-react-app framework. Data was built with a python crawler."
project: true
tag:
- three.js
- Javascript
- Python
- HTML & CSS
- Data Analytics & Visualization
- React
comments: true
---





<figure>
	<a href="https://github.com/MUYANGGUO/cyberleet/tree/master"><img src="https://drive.google.com/uc?id=1sutSwGWWPpFKhSgyF55IcLOE9rTvJRmT"></a>
	<figcaption><a href="https://github.com/MUYANGGUO/cyberleet/tree/master" title="Github Link">Click to visit github</a>.</figcaption>
</figure>

## a demo site:

[Here](https://muyangguo.github.io/cyberleet/)
## a video Demo
[V1 Demo](https://www.youtube.com/watch?v=w0qHvCFdl0k)

## About this project

I am a big fan of the game Cyberpunk 2077, and I have been working on leetcode problems recently because of graduation and job hunting. 

I have been interested in WegGL visualization projects, when I am learning the three.js, I decided to find a small project to practice. So this cyberpunk 2077 leetcode visualizations is built, for fun and for practice. I think the analysis of the graph connections for the leetcode questions will be an interesting next step for this project. This version is purely a preliminary basic feature to explore and display.

## Authors

* **Muyang Guo**

## Documentations

### 1. How I get the leetcode questions data:

There are many resources online for that already, the python script I modified is based from [here](https://gcyml.github.io/2019/03/03/Python%E7%88%AC%E5%8F%96Leetcode%E9%A2%98%E7%9B%AE%E5%8F%8AAC%E4%BB%A3%E7%A0%81/).

This will get the contents we need for each question, their front end ID (the number of the question), the content, the difficulty, we can parsed the data and dump in a JSON format that we can later directly import to our react project.

<div  style="overflow:scroll; height: 500px;">
{% highlight python %}
import requests
import json

session = requests.Session()
user_agent = r'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'

def get_problem_by_slug(slug):
    url = "https://leetcode.com/graphql"
    params = {'operationName': "getQuestionDetail",
              'variables': {'titleSlug': slug},
              'query': '''query getQuestionDetail($titleSlug: String!) {
            question(titleSlug: $titleSlug) {
                questionId
                questionFrontendId
                questionTitle
                questionTitleSlug
                content
                difficulty
                stats
                similarQuestions
                categoryTitle
                topicTags {
                        name
                        slug
                }
            }
        }'''
              }
    json_data = json.dumps(params).encode('utf8')

    headers = {'User-Agent': user_agent, 'Connection':
               'keep-alive', 'Content-Type': 'application/json',
               'Referer': 'https://leetcode.com/problems/' + slug}
    resp = session.post(url, data=json_data, headers=headers, timeout=10)
    content = resp.json()
    question = content['data']['question']
    return question

def get_problems():
    url = "https://leetcode.com/api/problems/all/"
    headers = {'User-Agent': user_agent, 'Connection': 'keep-alive'}
    resp = session.get(url, headers = headers, timeout = 10)
    question_list = json.loads(resp.content.decode('utf-8'))
    easy_set = list()
    medium_set = list()
    hard_set = list()
    all_set = list()
    questions = []
    for question in question_list['stat_status_pairs']:
        question_id = question['stat']['frontend_question_id']
        question_slug = question['stat']['question__title_slug']
        level = question['difficulty']['level']
        contents = get_problem_by_slug(question_slug)
        all_set.append({"id" : str(question_id), "name": question_slug, "difficulty": str(level), "content": contents})
        if level == 1:
            easy_set.append({"id" : str(question_id), "name": question_slug, "content": contents})
        elif level == 2:
            medium_set.append({"id" : str(question_id), "name": question_slug, "content": contents})
        else:
            hard_set.append({"id" : str(question_id), "name": question_slug, "content": contents})

    with open('cybergraph/src/data/easy.json', 'w') as easyfile:
        json.dump(easy_set, easyfile)
    with open('cybergraph/src/data/medium.json', 'w') as mediumfile:
        json.dump(medium_set, mediumfile)
    with open('cybergraph/src/data/hard.json', 'w') as hardfile:
        json.dump(hard_set, hardfile)
    with open('cybergraph/src/data/all.json', 'w') as allfile:
        json.dump(all_set, allfile)
    return easy_set, medium_set, hard_set, all_set


def get_problem_by_slug(slug):
    url = "https://leetcode.com/graphql"
    params = {'operationName': "getQuestionDetail",
              'variables': {'titleSlug': slug},
              'query': '''query getQuestionDetail($titleSlug: String!) {
            question(titleSlug: $titleSlug) {
                questionId
                questionFrontendId
                questionTitle
                questionTitleSlug
                content
                difficulty
                stats
                similarQuestions
                categoryTitle
                topicTags {
                        name
                        slug
                }
            }
        }'''
              }

    json_data = json.dumps(params).encode('utf8')

    headers = {'User-Agent': user_agent, 'Connection':
               'keep-alive', 'Content-Type': 'application/json',
               'Referer': 'https://leetcode.com/problems/' + slug}
    resp = session.post(url, data=json_data, headers=headers, timeout=10)
    content = resp.json()
    question = content['data']['question']
    return question

get_problems()

{% endhighlight %}
</div>

### 2. How I combined the three.js and react:

Three.js is not a user friendly library to start with, the documentations and examples are sometimes misleading, you will have to dive into deep and find something you need eventually. I would recommend to use babylon.js or any newer stuff. 

Three.js is also not very recommended to build with react. I used the pure three.js instead of the three-react-fiber lib, both will have issues for different reason, anyway, the code below is here:

For the three.js as a react component in `ThreeView.js`:

<div  style="overflow:scroll; height: 500px;">
{% highlight javascript %}
import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "./OrbitControls.js";
import allQuestions from "./data/all.json";
import "./ThreeView.css";

class ThreeView extends Component {
    // Here is the state control
    // bind the functions we need here to call in the componentDidMount(), will trigger a state change once we made change and re-render
    constructor(props) {
        super(props);
        this.state = {questionName: '', questionData: '', questionSlug: '', prequestionSlug: ''};
        this.animate = this.animate.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.initializeCamera = this.initializeCamera.bind(this);
    }
    componentDidMount() {
        // genreal set up with the full window
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1,
            10000
        );

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        // here the oribitcontrol is a piece of code that I found from the 
        // three.js documentation examples library
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.update();
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);
        this.initializeCamera();

        // Initialize the picking needed parameters
        this.cubesToBePicked = [];
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.INTERSECTED = null;

        // plane creationg
        var worldsize = 6000;
        this.plane = new THREE.Mesh(
            new THREE.PlaneGeometry(worldsize, worldsize, 1),
            new THREE.MeshBasicMaterial({
                color: "grey",
                opacity: 0.3,
                transparent: true,
            })
        );
        this.plane.rotation.set(-Math.PI / 2, 0, 0);
        this.scene.add(this.plane);

        // grid creation
        var size = 3000,
        step = 40;
        var geometry, material, line;
        for (let i = -size; i <= size; i += step) {
            if ((i / step) % 2 === 0) {
                continue;
            }
            geometry = new THREE.Geometry();
            material = new THREE.LineBasicMaterial({
                color: "purple",
            });
            geometry.vertices.push(new THREE.Vector3(-size, 0, i));
            geometry.vertices.push(new THREE.Vector3(size, 0, i));
            this.line = new THREE.LineSegments(geometry, material);
            this.scene.add(this.line);
        }
        for (let i = -size; i <= size; i += step) {
            if ((i / step) % 2 === 0) {
                continue;
            }
            geometry = new THREE.Geometry();
            material = new THREE.LineBasicMaterial({
                color: "green",
            });
            geometry.vertices.push(new THREE.Vector3(i, 0, -size));
            geometry.vertices.push(new THREE.Vector3(i, 0, size));
            this.line = new THREE.LineSegments(geometry, material);
            this.scene.add(this.line);
        }

        // blocks with color represent leetcode mapped from data
        // added to the scene for pickable event
        var offset = 2000,
        side = 50,
        sidegap = 80;
        for (let i = 0; i < allQuestions.length; i += 1) {
        var questionIndex = Number(allQuestions[i]["id"]) - 1;
        var bottommaterial;
        var difficulty;
        var questionData = allQuestions[i]["content"];
        if (allQuestions[i]["difficulty"] === "1") {
            bottommaterial = new THREE.MeshBasicMaterial({ color: 0x00cc00 });
            difficulty = 'EASY';
        } else if (allQuestions[i]["difficulty"] === "2") {
            bottommaterial = new THREE.MeshBasicMaterial({ color: 0xff9900 });
            difficulty = 'MEDIUM';
        } else {
            bottommaterial = new THREE.MeshBasicMaterial({ color: 0xD63333 });
            difficulty = 'HARD';
        }
        var bottomgeometry = new THREE.BoxGeometry(60, 20, 60);
        var row = Math.floor(questionIndex / side);
        var col = questionIndex % side;
        bottomgeometry.translate(
            col * sidegap - offset,
            10,
            row * sidegap - offset
        );
        this.bottommesh = new THREE.Mesh(bottomgeometry, bottommaterial);
        
        // Pass some data to the object so later to be used
        this.bottommesh.name = allQuestions[i]["id"] + ' - ' + allQuestions[i]["name"].split('-').join(' ') + ' - ' + difficulty;
        this.bottommesh.userData = questionData;
        this.scene.add(this.bottommesh);
        this.cubesToBePicked.push(this.bottommesh);

    }

        // Here make sure to have pointerdown instead of mousedown as keyword for the mousedown event handler, as the general mousedown will not be triggered due to the use of the orbitcontrol.
        window.addEventListener("resize", this.onWindowResize, false);
        window.addEventListener('pointerdown', this.onMouseDown, false);
        this.animate();
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.frameId);
        this.mount.removeChild(this.renderer.domElement);
    }

    // we can track the mouse movement and use the raycaster to target to the 
    // objects we are clicking
    onMouseDown(event) {
        event.preventDefault();
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.cubesToBePicked);
        if (intersects.length > 0) {
            if (intersects[0].object != this.INTERSECTED) {
                if (this.INTERSECTED)
                    this.INTERSECTED.material.color.setHex(this.INTERSECTED.currentHex);
                this.INTERSECTED = intersects[0].object;
                this.INTERSECTED.currentHex = this.INTERSECTED.material.color.getHex();
                this.INTERSECTED.material.color.setHex(0xFF00FF);
                this.setState((state) => (  
                { 
                    prequestionSlug: state.questionSlug, 
                    questionName: this.INTERSECTED.name,
                    questionData: this.INTERSECTED.userData["content"], 
                    questionSlug: this.INTERSECTED.userData["questionTitleSlug"]
                }));

                
            }
        }
        else //no intesections
        {
            if (this.INTERSECTED) {
                this.INTERSECTED.material.color.setHex(this.INTERSECTED.currentHex);
            }
            this.INTERSECTED = null;
            this.setState((state) => (
            { 
                prequestionSlug: state.questionSlug, 
                questionName: '',
                questionData: '', 
                questionSlug: ''
            }));
        
        

        }
        
    }


    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    initializeCamera() {
        this.camera.position.x = 0;
        this.camera.position.y = 2000;
        this.camera.position.z = 1500;
        this.controls.update();
    }
    animate() {

        this.frameId = window.requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        return (
        <div>
            <button id = "floatingButton" className="btn orange" onClick={()=> window.open("https://www.leetcode.com/problems/" + this.state.prequestionSlug, "_blank")}>CYBER LEET_ : {this.state.questionName}</button>
            {this.state.questionData && <button className="loading" dangerouslySetInnerHTML={{ __html: this.state.questionData}}/>}
            <div
            id="ThreeViewer"
            ref={mount => {
                this.mount = mount;
            }}
            />
        <button id = "credits" className="credits default" onClick={()=> window.open("https://www.muyangguo.xyz/", "_blank")}>@ Muyang Guo </button>
        </div>

        );
    }
}
export default ThreeView;

{% endhighlight %}
</div>


For a complete project codes please visit the github project repo @ [here](https://github.com/MUYANGGUO/cyberleet/tree/master).

### Next step:

I will build more data to be displayed, including the company tagged questions, as well similar questions, the aim is to show more interactive contents and perform connection analysis of the data graph. 


---
Copyright 2020 Muyang Guo


