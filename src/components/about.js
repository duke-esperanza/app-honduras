import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles={
    div:{
        padding:'2em',
    },
    text:{
        fontSize: 20,
    },
    break:{
        height:'2em',
    }
}

function About(props){
    const {classes} = props;
    return(
        <div className={classes.div}>
            <Typography className={classes.text}>
                This application was built on behalf of Clinica Esperanza as an application to manage
                patients recieving treatment for diabetes in Roatan, Honduras. This web application
                is meant to assist nurses at Clinica Esperanza with monitoring and contacting patients.
                There is no medical information contained on the application other than appointment dates.
                <div className={classes.break}></div>
                <a href='http://clinicaesperanza.org/' target="_blank" rel="noopener noreferrer">Clinica Esperanza</a> provides low-cost/no cost medical care to the people of Roatan. At the medical 
                clinic and  hospital, people can receive services from the walk-in medical clinic, women’s health 
                center, pediatrics, birthing center, dental clinic including a laboratory and pharmacy. The clinic 
                also provides outreach clinics, community health education programs, and school health screenings 
                for vision and oral health.
                <div className={classes.break}></div>
                The clinic is located in Sandy Bay and all people are welcome. The Clinic treats approximately 80-100 
                patients in a typical day usually about 60% adults and 40% children. It operates five days per week, 
                starting at 7:30am until 6:00pm. More than 3,500 patients consider the Clinic to be their primary 
                medical care provider. Thus far, more than 65,000 patients have been treated in the Clinic.
                <div className={classes.break}></div>
                Due to the limited number of medical facilities available, patients have come from all over the island 
                and the mainland to seek treatment or medications The Clinic provides a needed service to people who 
                would otherwise likely not seek treatment due to costs and the crowded condition of the local public 
                hospital.
                <div className={classes.break}></div>
                This application was developed by a team at Duke University as part of a semester long project
                for the course <a href='http://db.cs.duke.edu/courses/compsci408/fall18/' target="_blank" rel="noopener noreferrer">Computer Science 408</a>. All Questions about the application should be directed to
                the instructors of this course.
            </Typography>
        </div>
    )
}

About.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);