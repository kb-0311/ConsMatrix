import { Avatar, Button, Typography } from '@mui/material';
import React from 'react'
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import './About.css'

const About = () => {

    const visitLinkedin= () => {
        window.location = "https://www.linkedin.com/in/kanishka-bansode-473952144/";
      };

  return (
    <div className="aboutSection">
    <div></div>
    <div className="aboutSectionGradient"></div>
    <div className="aboutSectionContainer">
      <Typography component="h1">About Me</Typography>

      <div>
        <div>
          <Avatar
            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
            src={"https://avatars.githubusercontent.com/u/96020697?v=4"}
            alt="Founder"
          />
          <Typography>Kanishka Bansode</Typography>
          <Button onClick={visitLinkedin} color="primary">
            Linkedin
          </Button>
          <span>
            This is a mock web app for the testing and content management system for BOT projects in government Agencies
          </span>
        </div>
        <div className="aboutSectionContainer2">
          <Typography component="h2">My Links</Typography>

          <a href="https://github.com/kb-0311" target="blank">
            <BsGithub className="githubSvgIcon" />
          </a>

          <a href="https://www.linkedin.com/in/kanishka-bansode-473952144/" target="blank">
            <BsLinkedin className="linkedinSvgIcon" />
          </a>
        </div>
      </div>
    </div>
  </div>
  )
}

export default About