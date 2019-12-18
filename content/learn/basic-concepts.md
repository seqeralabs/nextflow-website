---
title: 'Basic Concepts'
date: 2018-12-20T15:46:10+10:00
draft: false
weight: 1
thumbnail: 'learn/basic-concepts.jpg'
headerTransparent: true
heroHeading: 'Basic Concepts'
heroSubHeading: ''
heroBackground: 'learn/basic-concepts.jpg'
heroDiagonal: true
heroDiagonalFill: '#fff'
heroHeight: 300
works: ['Concepts']
desciption: 'This example shows how write a pipeline made up of two simple BASH *.'
type: 'work'
---

## Executing workflows
Nextflow is both a programming language and a workflow engine.

It can be installed on most systems with:

```
$ curl -s https://get.nextflow.io | bash
```

Workflows are executed using the `nextflow run` command.

Try it out the example below:

```
$ ./nextflow run hello
```

## Nextflow scripts

A Nextflow script is a plain text file that defines the workflow 
and usually denoted with the `.nf` extension. 

The main components of a workflow script are *processes* and *channels*.

## Processes

A Nextflow script is typically a collection of processes which are joined together with channels. 

Processes can be written in any scripting language (Bash, Perl, Ruby, Python, etc.) and form the building blocks of any workflow. 

In their most used form, they are composed of an input, output and script section. 

In the example below, the process `helloWorld` consumes values from the `greetings` channel and echos the greeting.

<br>
{{< highlight groovy "linenos=table" >}}

greetings = Channel.from "Hello", "Ciao", "Hola", "Bonjour"

process helloWorld {

    input:
      val x from greetings
    
    script:
      """
      echo "$x world!"
      """
}

{{< / highlight >}}
</br>

Try it for yourself. Save the snippet above in a file `hello.nf` and execute
`nextflow run hello.nf`.


## Channels

Channels connect processes and allow them to communicate. 

They hold data and define how it flows through a workflow. 

Channels can contain any data structure including values, objects, files or directories. 

Importantly, it is the contents of a channel that implicitly defines the workflow execution. 

In the example below, the channel `greetings` contains four values, therefore the process helloWorld is executed four times. 

The `welcomes` channel will contain four files which will each be converted to uppercase.


{{< highlight groovy "linenos=table" >}}

greetings = Channel.from "Hello", "Ciao", "Hola", "Bonjour"

process helloWorld {

    input:
      val x from greetings

    output:
      file "greeting.txt" into welcomes
    
    script:
    """
      echo "$x world!" > 'greeting.txt'
    """
}

process upperCase {

    input:
      file y from welcomes

    output:
      file "uppercase.txt" into loud_welcomes 

    script:

    """
       cat $y | tr '[a-z]' '[A-Z]' > uppercase.txt
    """
}

{{< / highlight >}}


## Operators

Operators shape the data inside *channels* thereby implicitly defining the workflow execution. 

The can be used to transform channels by filtering, splitting, modiyfing or 
combining using operators.

Consider the operator `collect` which collects all the contents of a channel into
a single element. 

If we apply this operator to the `greetings` channel, the 
channel will now contain one element, a tuple of four strings, 
and the process will only run once.

<br>
{{< highlight groovy "linenos=table" >}}

greetings = Channel.from "Hello", "Ciao", "Hola", "Bonjour"

process helloWorld {

    input:
      val x from greetings.collect()
    
    script:
      """
      echo "$x world!"
      """
}

{{< / highlight >}}
</br>

### Polyglot

Nextflow processes are polygot, they can be written in any language. 

Define the appropriate shebang and go ahead with your favorite including Python, R, Perl and Julia. 

Nextflow variables are injected into the script at runtime. 

Below `$x` is a Nextflow variable injected into some python code.

<br>
{{< highlight groovy "linenos=table" >}}

sequence = Channel.from(0, 2, 4, 8, 16)
  
process pythonProcess {

    input:
      val x from sequence

    script:
      """
      #!/usr/bin/env python
      import random

      def average ( a, b ):
          average = a + b / 2
          return average

      y = random.randint ( 1, 16 ) 
      average = average ( ${x},  y )

    """
}
{{< / highlight >}}
<br>


## Parameters

Parameters are special variables that can be defined at the command line.

They are denoted `params` in a nextflow script and often used to define
input parameters such as files.

Default parameters can be defined in a script and overridden on the command line
with `--<param_name>`.

<br>
{{< highlight groovy "linenos=table" >}}

greetings = Channel.from "Hello", "Ciao", "Hola", "Bonjour"
params.planet = "Earth"

process helloWorld {

    input:
      val x from greetings
    
    script:
      """
      echo "$x $param.planet"
      """
}
{{< / highlight >}}
</br>

We can change the parameter with `--planet`.

```
nextflow run hello.nf --planet "Mars"
```

### Containers
Containers allow the encapsulation software and enable full portability Build your own containers or use pre-built images from registries such Dockerhub and Biocontainers. Native support for Singularity is especially useful for shared and on-premise environments. Build-in support for conda means that you ca. If we wanted to extract a particular region from three 1000 genomes samples using samtools.

Copy the code to a file named script.nf and run with:

```
$ nextflow run script.nf -with-docker
```


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


### Resume and the working directory


### Git-intergration

