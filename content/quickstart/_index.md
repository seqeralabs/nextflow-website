---
title: 'Nextflow Quick Start'
date: 2019-07-16T15:23:36+10:00
draft: false
type: 'quickstart'
featured: true
weight: 1
---
# Nextflow Quick Start

## Introduction

Nextflow is a workflow management system for the development of scientific workflows. Based on Dataflow it can automatically parallelize steps. 


## Key concepts

-- **Process**: In Nextflow each process is a unit of work, this may be calling another program or block of scripting. 

-- **Channel**: A queue, often used to link processes together as data flows from one process to another

-- **Executor**: Backend that runs your processes, local, HPC schedulers, cloud, and others. 

-- **Dataflow**: Paradigm that provides automatic parallelization of processes once data is available to a given process. 


## Install

-- **Requirements**: Java 8 or later

Nextflow can quickly be installed:
```
curl -fsSL https://get.nextflow.io | bash
```

## Create some data

Channels in Nextflow are the primary way to deal with data passing from process to process. 
```groovy
data = Channel.fromList(['hello', 'from', 'Nextflow'])
```

## First process
A Nextflow process is normally composed of inputs, outputs, and a script block. Here we define a simple that takes our channel defined in the previous step as an input. The script block just echos the word into a file, and the output defines a glob pattern `"*.txt"` which will match all txt files output. Nextflow automatically parallelizes this step for you, as there are three items in the input channel Nextflow will automatically run three processes in parallel. This feature allows you to seamlessly scale your workflow based on the input data. 
```groovy
process saveToFile{
    input:
    val word from data

    output:
    file "*.txt" into outs
    """
    echo ${word} > ${word}.txt
    """
}
```

## Second process
For the next process we again define an input, this time it is the output from the previous step. Nextflow implicitly infers the task dependencies based on inputs and output, running this step only once the data from the `saveToFile` process is available. 

```groovy
process wc{
	echo true
	input:
	file wordfile from outs

	"""
	cat ${wordfile} | wc
	"""
}
```

## Container process

```
```

## Putting it all together

The two process together demonstrates again that no explicit process dependency must be defined.  

```groovy
data = Channel.fromList(['hello', 'from', 'Nextflow'])

process saveToFile{
    input:
    val word from data

    output:
    file "*.txt" into outs
    """
    echo ${word} > ${word}.txt
    """
}

process wc{
	echo true
	input:
	file wordfile from outs

	"""
	cat ${wordfile} | wc
	"""
}
```

## Nextflow configuration
One key component of Nextflow is the ability to separate the configuration of a workflow from the workflow definition. This enables portable workflows that can be configured across a range of executors. 

Below two profiles are defined, one for local execution and the other for an HPC cluster using SGE. There is no need to alter your workflow 

```
profiles {

    standard {
        process.executor = 'local'
        docker.enabled = true
    }

    cluster {
        process.executor = 'sge'
        process.queue = 'long'
        process.memory = '10GB'
    }

}
```

## Integration with source control
Nextflow provides support for pulling workflows directly from source control repositories including GitHub and GitLab. 

```
nextflow run nextflow-io/rnaseq-nf -with-docker
```
## Key takeaways

Although a brief introduction to Nextflow 

* Automatic parallelization of your tasks
* Portable workflows can run across multiple executors
* 
 
## Next steps

-- [Reference documentation](/docs/latest) provides complete documentation of Nextflow's features

-- [Nextflow Gitter](https://gitter.im/nextflow-io/nextflow) Join us in the chat if you need any help

-- [nf-core](https://nf-co.re/) Checkout community pipelines 