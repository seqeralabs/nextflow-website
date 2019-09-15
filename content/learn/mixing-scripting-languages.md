---
title: 'Mixing Scripting Languages'
date: 2018-12-20T15:46:10+10:00
draft: false
weight: 5
thumbnail: 'learn/mixing-languages.jpg'
headerTransparent: true
heroHeading: 'Mixing Scripting Languages'
heroSubHeading: 'A basic pipeline example'
heroBackground: 'learn/mixing-languages.jpg'
heroDiagonal: true
heroDiagonalFill: '#fff'
heroHeight: 300
works: ['Examples']
desciption: 'This example shows how write a pipeline made up of two simple BASH processes.'
type: 'work'
---

When using Nextflow your are not limited to BASH scripts, in a pipeline script
you can mix any scripting language. This means that for each <i>process</i> you are free
to use the one that fits best  or simply choose any scripting language you prefer.

{{< highlight groovy "linenos=table" >}}

#!/usr/bin/env nextflow

params.range = 100

/*
 * A trivial Perl script producing a list of numbers pair
 */
process perlTask {
    output:
    stdout randNums

	shell:
    '''
    #!/usr/bin/env perl
    use strict;
    use warnings;

    my $count;
    my $range = !{params.range};
    for ($count = 0; $count < 10; $count++) {
     	print rand($range) . ', ' . rand($range) . "\n";
    }
	'''
}


/*
 * A Python script task which parses the output of the previous script
 */
process pyTask {
    echo true

    input:
    stdin randNums

    '''
    #!/usr/bin/env python
    import sys

    x = 0
    y = 0
    lines = 0
    for line in sys.stdin:
        items = line.strip().split(",")
        x = x+ float(items[0])
        y = y+ float(items[1])
        lines = lines+1

    print "avg: %s - %s" % ( x/lines, y/lines )
	'''

}

{{< /highlight  >}}

<br>

### Synopsis

In the above example it is defined a simple pipeline made up of two processes.
The first one executes a Perl code, because the script block definition starts
with a PERL <em>shebang</em> declaration (line 14).

In the same way the second process will execute a Python piece of code, by
the simply fact the the script block starts with a Python <em>shebang</em> header (line 38).