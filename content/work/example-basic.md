---
title: 'Basic Pipeline'
date: 2018-12-20T15:46:10+10:00
draft: false
weight: 3
thumbnail: 'work/blue-circuit.jpg'
headerTransparent: true
heroHeading: 'Basic Pipeline'
heroSubHeading: 'A basic pipeline example'
heroBackground: 'work/blue-circuit.jpg'
works: ['Example']
desciption: 'This example shows how write a pipeline made up of two simple BASH processes.'
---

### In this example we see how write a pipeline made up of two simple BASH processes so that the results produced by the first are consumed by the second process.


{{< highlight groovy "linenos=table" >}}

process foo {
    conda "bwa samtools multiqc"

    """
    your_command --here
    """
}
{{< / highlight >}}
