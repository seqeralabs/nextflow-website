---
title: 'Why Nextflow'
date: 2019-07-16T15:23:36+10:00
draft: false
type: 'why'
featured: true
weight: 1
---

### You have come to the right place!

<br/>

## Seqera Labs
If your team or organization needs Nextflow support or long-term maintenance of Nextflow releases, Seqera Labs provides 

<!-- Spash features (Content: data/splash.json ) -->
{{ range .Site.Data.splash }}
  <div class="strip strip-{{ .colour }} pt-8 pb-8 splash">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6 ">
          {{if not (modBool .title 2)}} <img class="img-fluid" src="{{ .image }}" />
          {{ else }} <h2 class="right-align">{{ .heading }}</h2>
                     <p class="xlarge right-align" style="color:#28AE61">{{ .subheading }}</p>
                     <p class="large right-align">{{ .paragraph }}</p>
          {{ end }}
        </div>
        <div class="col-12  col-md-6">
          {{if (modBool .title 2)}} <img class="img-fluid" src="{{ .image }}" />
          {{ else }} <h2>{{ .heading }}</h2> 
                     <p class="xlarge" style="color:#28AE61">{{ .subheading }}</p>
                     <p class="large">{{ .paragraph }}</p>
          {{ end }}
        </div>
      </div>
    </div>
  </div>
  <svg class="hero-diagonal" aria-hidden="true" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 10" preserveAspectRatio="none">
    <polygon fill="#F0F0F0" points="{{ .points }}"/>
  </svg>
  </div>
{{ end }}