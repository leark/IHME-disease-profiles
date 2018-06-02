# IHME Disease Profiles

## Overview

The Disease Profiles project is sponsored by the Institute of Health Metrics and Evaluation (IHME), a research center that provides publicly accessible population health data used to evaluate current policies and strategies. Currently, users of the existing tools on the IHME website have difficulty viewing the impact of a specific disease. Our web page provides snapshots of the impact of over 300 diseases in 195 different countries. This tool will assist health policy makers, advocates, non-governmental organizations, and members of the general public in making informed decisions about public health in regards to funding, policy, and education.

[Website](https://students.washington.edu/shl7/capstone/diseaseprofile.html)
[GitHub](https://github.com/leark/IHME-disease-profiles)

## List of Contents

1. Built with
2. Technology decisions
3. Authors
4. Acknowledgments

## Built With

* [PHP](https://php.net/) - Backend
* [MySQL](https://www.mysql.com/) - Backend Database
* [D3](https://d3js.org/) - Used to generate visualizations
* [jQuery](https://jquery.com/) - Javascript library to ease developement
* [DOM to Image](https://github.com/tsayen/dom-to-image) - Javascript libarry used to convert graph elements as image files
* [FileSaver](https://github.com/eligrey/FileSaver.js/) - Javascript library used to save image files onto computer

## Technology Decisions

Most of our major decisions on technology used stems from what our sponsor used to create their [country profiles](http://www.healthdata.org/results/country-profiles) and their future API. Country profiles uses D3 to generate the visualizations and IHME's future API is based on PHP. MySQL was picked as it is a free resource. DOM-to-Image and FileSaver work in conjunction to for the graphs to be saved easily as a PNG file.

## Authors

* **Seung Lee** - *Project Manager / Developer* - [leark](https://github.com/leark)
* **Sarah Loftis** - *Developer* - [srloftis](https://github.com/srloftis)
* **Sarah Park** - *Developer* - [parks96uw](https://github.com/parks96uw)
* **Saralyn Santos** - *Designer* - [saralyns](https://github.com/saralyns)

## Acknowledgments

* [IHME](http://www.healthdata.org/)
* Informatics Social Impact Capstone Class
* User survey participants
