maxPopulationSize = 16;

var target = "Michal"
var targetChanged = false;
var population = ["QACSDFASFGREGTdsad", 
                  "QACSAFASFGREGTdsad",
                  "QACSDFASGGREGTdsad",
                  "QACSDFASFGREGDdsad"];

var distance = function(a, b) {
  var minLength = Math.min(a.length, b.length)
  var maxLength = Math.max(a.length, b.length)

  var distance = 0;
  for (var i=0; i<minLength; i++) {
    var va = a.charCodeAt(i);
    var vb = b.charCodeAt(i);
    distance += Math.abs(parseInt(va) - parseInt(vb))
  }

  // make length important - "a lot"
  distance += 100 * Math.abs(a.length - b.length);

  return distance;
}

String.prototype.replaceAt=function(index, replacement) {
  return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

var mutation = function(a) {
  // length mutation
  var rndpos = -1;

  if (a.length != target.length) 
  {
    rndpos = Math.round(Math.random() * (a.length - 1));
    if (rndpos > a.length - 1) {
      rndpos = a.length - 1;
    }
    var mutateLength = Math.random();
    if (0.0 <= mutateLength && mutateLength < 0.33 && target.length < a.length) {
      // substract
      a = a.substr(0, rndpos) + a.substr(rndpos + 1, a.length - 1);
    } else if (0.33 <= mutateLength && mutateLength < 0.66) {
      // do not change length
    } else if (0.66 <= mutateLength && mutateLength < 1.0 && target.length > a.length) {
      // make longer
      a = a.substr(0, rndpos) + "X" + a.substr(rndpos, a.length - 1);
    }
  }

  // mutation - value
  rndpos = (rndpos == -1) ? Math.round(Math.random() * (a.length - 1.0)) : rndpos;

  if (rndpos > a.length - 1) {
    rndpos = a.length - 1;
  }

  var newValue = a.charCodeAt(rndpos) + (2.0 - Math.random() * 4.0);

  if (newValue < 32)
    newValue = 32;
  else if (newValue > 127)
    newValue = 127; 

  var newChar = String.fromCharCode(newValue);
  return a.replaceAt(rndpos, newChar);
};

var childMix = function (a, b) {  
  var child = "";
  for (var i=0; i<a.length; i++) {
    var randValue = (1.0 - (Math.random() * 2.0)) > 0.0; 
    child += (randValue) ? a[i]: b[i];
  }

  return mutation(child);
}

var childMid = function (a, b) {  
  var mid = a.length / 2;
  var child = "";
  var i=0;
  for (; i<mid; i++) {
    child += a[i];
  }
  for (; i<b.length; i++) {
    if (b[i] == undefined) {
      console.log("ups")
    }
    child += b[i];
  }

  return mutation(child);
}

for (var generation=0; generation<10000; generation++) {
  var childs = [];
  var weights = [];

  for (var j=0; j<population.length; j++) {
    for (var k=j+1; k<population.length; k++) {
      var c = childMix(population[j], population[k]);

      var weight = distance(target, c);

      if (childs.length > 0) {
        var wlen = weights.length;
        var added = false;
        for (var w=0; w<wlen;w++) {
          if (weight < weights[w] && !added) {
            weights.splice(w, 0, weight);
            childs.splice(w, 0, c);
            added = true;
          }
        }
        if (!added) {
          childs.push(c)
          weights.push(weight)
        }
      } else {
        childs.push(c)
        weights.push(weight)
      }
    }
  }

  var popLen = Math.min(childs.length, maxPopulationSize);
  population = [];
  for (var s=0; s<popLen; s++) {
    population.push(childs[s]);
  }

  // population adaptation rank
  var rank = Math.abs(weights[(popLen-1)]);
 
  console.log("Population count: " + population.length + " [" + generation + ": " + rank + "]")
  console.log('Representative - best: ' + population[0]);
  console.log('Representative - least: ' + population[population.length-1]);

  if (rank <= 0 && targetChanged) {
    break;
  }

  if (rank <= 0 && !targetChanged) {
    target = "Hello world !!!";
    targetChanged = true;
  }
}