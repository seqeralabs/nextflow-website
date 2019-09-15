---
title: 'Patterns'
date: 2018-12-20T15:46:10+10:00
draft: false
weight: 6
thumbnail: 'learn/patterns.jpg'
headerTransparent: true
heroHeading: 'An example BLAST workflow'
heroSubHeading: 'A basic pipeline example'
heroBackground: 'learn/patterns.jpg'
heroDiagonal: true
heroDiagonalFill: '#fff'
heroHeight: 300
works: ['Patterns']
desciption: 'This example shows how write a pipeline made up of two simple BASH processes.'
type: 'work'
---

The example below splits a FASTA file into chunks and executes for each of them a BLAST query in a parallel manner. Then, all the sequences for the top hits are collected and merged to a single result file.

{{< highlight groovy "linenos=table" >}}
#!/usr/bin/env nextflow

/*
 * Defines the pipeline inputs parameters (giving a default value for each for them) 
 * Each of the following parameters can be specified as command line options
 */
params.query = "$HOME/sample.fa"
params.db = "$HOME/tools/blast-db/pdb/pdb"
params.out = "./result.txt"
params.chunkSize = 100 

db_name = file(params.db).name
db_path = file(params.db).parent

/* 
 * Given the query parameter creates a channel emitting the query fasta file(s), 
 * the file is split in chunks containing as many sequences as defined by the parameter 'chunkSize'.
 * Finally assign the result channel to the variable 'fasta' 
 */
Channel
	.fromPath(params.query)
	.splitFasta(by: params.chunkSize)
	.set { fasta }

/* 
 * Executes a BLAST job for each chunk emitted by the 'fasta' channel 
 * and creates as output a channel named 'top_hits' emitting the resulting 
 * BLAST matches  
 */
process blast {
    input:
    file 'query.fa' from fasta
    file db_path

    output:
    file 'top_hits'

    """
    blastp -db $db_path/$db_name -query query.fa -outfmt 6 > blast_result
    cat blast_result | head -n 10 | cut -f 2 > top_hits
    """
}

/* 
 * Each time a file is emitted by the 'top_hits' channel, an extract task is executed 
 * producing a file containing the matching sequences 
 */
process extract {
    input:
    file top_hits
    file db_path

    output:
    file 'sequences'

    """
    blastdbcmd -db $db_path/$db_name -entry_batch top_hits | head -n 10 > sequences
    """
}

/* 
 * Collects all the sequences files into a single file 
 * and prints the resulting file content when complete 
 */ 
sequences
    .collectFile(name: params.out)
    .println { file -> "matching sequences:\n ${file.text}" }

{{< /highlight  >}}
<br>

### Try it in your computer 

In order to run this pipeline in your computer you will required: 

* Unix-like operating system 
* Java 8 (or higher)
* Docker 

Install Nextflow entering the following command in the shell terminal:

    $ curl -fsSL https://get.nextflow.io | bash

Then launch the pipeline execution using this command: 

    $ ./nextflow run blast-example -with-docker 

It will automatically download the pipeline [Github repository](https://github.com/nextflow-io/blast-example) 
and the associated Docker images, thus the first execution can requires few minutes to complete 
depending you network connection. 