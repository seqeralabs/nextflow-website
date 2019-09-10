---
title: 'Concepts'
date: 2018-12-20T15:46:10+10:00
draft: false
weight: 3
thumbnail: 'work/blue-circuit.jpg'
headerTransparent: true
heroHeading: 'Concepts'
heroSubHeading: 'A basic pipeline example'
heroBackground: 'work/blue-circuit.jpg'
works: ['Examples']
desciption: 'This example shows how write a pipeline made up of two simple BASH processes.'
type: 'work'
---

### EXECUTION
Nextflow is both a language and a workflow engine. A Nextflow script is made by joining together different processes with channels. Each process can be written in any scripting language (Bash, Perl, Ruby, Python, etc.). Workflows can be run with nextflow run. Try it out with:

{{< highlight bash >}}

$ nextflow run hello

{{< / highlight >}}

### PARAMETERS


### PROCESSES

Processes form the building blocks of any workflow. In their most basic form, they are defined with an input, output and script. Let’s first create some data with a channel containing some values. The process consumes values from the `greetings` channel and echos the contents.

{{< highlight groovy "linenos=table" >}}

greetings = Channel.from "Hello", "Ciao", "Hola", "Bonjour"

process helloWorld {

    input:
    val x from greetings
    
    script:
    """
    printf "$x world!"
    """
}

{{< / highlight >}}

```
test code triple
```

something

`
test code single
`

### CHANNELS

Channels hold data and define how it flows through a workflow. They are used to connect processes and allow them to communicate with each other. Channels can contain any data structure including values, objects, files or directories. Importantly, it is the contents of a channel that implicitly defines the execution. The channel `helloworld` contains four files, therefore the process upperCase is executed four times.


{{< highlight groovy "linenos=table" >}}

process upperCase {

    input:
    file y from helloworld_channel

    output:
    file "uppercase.txt" into uppercase_channel 

    script:

    """
    cat $y | tr '[a-z]' '[A-Z]' > uppercase.txt
    """
}

{{< / highlight >}}


### OPERATORS

Channels can be filtered, split, modified and combined using operators. Operators shape the data, and therefore implicitly orchestrate the workflow execution. Consider the operator `collect` which collects all the contents of a channel in a single element. If we apply the collect operator to our `uppercase` channel, the process will run only once.

{{< highlight groovy "linenos=table" >}}

process combineFiles {

    input:
    file z from uppercase.collect()

    output:
    file "collected.txt" into combinedFiles

    script:

    """
    cat *.txt > combined.txt

    """
}

{{< / highlight >}}


### POLYGOT

Nextflow processes are polygot, they can be written in any language. Define the appropriate shebang and go ahead with your favourites including Python, R, Perl, Julia, Rust and Go. Nextflow variables are injected into the script at runtime. Consider this python process where `x` is a Nextflow variable injected into some python code.

{{< highlight groovy "linenos=table" >}}

sequence = Channel.from(0, 2, 4, 8, 16)
  
process myPythonProcess {

    input:
    val x from sequence

    """
    #!/usr/bin/env python
    import random

    def average ( x, y ):
        average = x + y / 2
        return average

    y = random.randint ( 1, 16 ) 
    average = average ( ${x},  y )

    """
}

{{< / highlight >}}


### CONTAINERS
Containers allow the encapsulation software and enable full portability Build your own containers or use pre-built images from registries such Dockerhub and Biocontainers. Native support for Singularity is especially useful for shared and on-premise environments. Build-in support for conda means that you ca. If we wanted to extract a particular region from three 1000 genomes samples using samtools.

Copy the code to a file named script.nf and run with:

{{< highlight bash "linenos=table" >}}

$ nextflow run script.nf -with-docker *OR* -with-singularity 

{{< / highlight >}}


{{< highlight groovy "linenos=table" >}}

samples = Channel.from('HG00154','HG00155','HG00156')
params.region = "17:7512445-7513455"

process samtools {
    container 'biocontainers/samtools:1.3.1'
    tag "$sample_id"
    input:
    val sample_id from samples
    output:
    set val(sample_id), file("${sample_id}.sam") into sams
    script:
    """
    #!/usr/bin/env bash
    PREFIX="ftp://ftp.1000genomes.ebi.ac.uk/vol1/ftp/phase1/data/"
    SUFFIX=".mapped.ILLUMINA.bwa.GBR.low_coverage.20101123.bam"
    URL="\$PREFIX""${sample_id}/alignment/${sample_id}""\$SUFFIX"
    samtools view -h \$URL ${region} > ${sample_id}.sam
    """
}
sams.println()

{{< / highlight >}}