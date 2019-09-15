---
title: 'Simple Pipeline'
date: 2018-12-20T15:46:10+10:00
draft: false
weight: 3
thumbnail: 'learn/basic-pipeline.jpg'
headerTransparent: true
heroHeading: 'Basic Pipeline'
heroSubHeading: 'A basic pipeline example'
heroBackground: 'learn/basic-pipeline.jpg'
heroDiagonal: true
heroDiagonalFill: '#fff'
heroHeight: 300
works: ['Examples']
desciption: 'This example shows how write a pipeline made up of two simple BASH processes.'
type: 'work'
---

### In this example we see how write a pipeline made up of two simple BASH processes so that the results produced by the first are consumed by the second process.

```groovy
#!/usr/bin/env nextflow
 
params.in = "$baseDir/data/sample.fa"
sequences = file(params.in)
 
// Split a fasta file into multiple files with awk
process splitSequences {
 
    input:
    file 'input.fa' from sequences
 
    output:
    file 'seq_*' into records
 
    """
    awk '/^>/{f="seq_"++d} {print > f}' < input.fa
    """
}
 
// Reverse the sequences with rev
process reverse {
 
    input:
    file x from records
     
    output:
    stdout result
 
    """
    cat $x | rev
    """
}
 
// Print the channel content
result.subscribe { println it }
```