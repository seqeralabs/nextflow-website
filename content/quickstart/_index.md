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

## Pull a workflow

## Nextflow configuration
One key component of Nextflow is the ability to separate the configuration of a workflow from the workflow definition. This enables portable workflows that can be configured across a range of executors. 

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

## Next steps

-- [Reference documentation](/docs/latest) provides complete documentation of Nextflow's features

-- [Nextflow Gitter](https://gitter.im/nextflow-io/nextflow) Join us in the chat if you need any help

-- [nf-core](https://nf-co.re/) Checkout community pipelines 