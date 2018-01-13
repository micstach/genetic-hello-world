maxPopulationSize = 64;

var target = "Michal Stachanczyk"
var targetChanged = false;
var population = ["QACSDFASFGREGTdsad", 
                  "QACSAFASFGREGTdsad",
                  "QACSDFASGGREGTdsad",
                  "QACSDFASFGREGDdsad",
                  "QACSDFASFGREGTdsak"];

var distance = function(a, b) {
  var minLength = Math.min(a.length, b.length)
  var maxLength = Math.max(a.length, b.length)

  var distance = 0;
  for (var i=0; i<minLength; i++) {
    var valA = a.charCodeAt(i);
    var valB = b.charCodeAt(i);
    distance += Math.abs(parseInt(valA) - parseInt(valB))
  }

  return distance;
}

String.prototype.replaceAt=function(index, replacement) {
  return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

var mutation = function(a) {
  var randpos = Math.round(Math.random() * (a.length - 1.0));

  if (randpos > a.length - 1) {
    randpos = a.length - 1;
  }

  var newValue = a.charCodeAt(randpos) + (2.0 - Math.random() * 4.0);

  if (newValue < 32)
    newValue = 32;
  else if (newValue > 127)
    newValue = 127; 

  return a.replaceAt(randpos, String.fromCharCode(newValue));
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

var d = 10000;//distance(population[0], population[1]);

for (var g=0; g<10000; g++) {
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
            childs.splice(w, 0, c);//{value: c, w: weight});
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
  d = Math.abs(weights[(popLen-1)]);
 

  console.log("Population count: " + population.length + " [" + g + ":" + d + "]")
  console.log('Representative - best: ' + population[0]);
  console.log('Representative - least: ' + population[population.length-1]);

  if (d < 50 && !targetChanged) {
    target = "Stachanczyk Michal";
    targetChanged = true;
  }

  if (d == 0 && targetChanged) {
    break;
  }
}

//console.log("Distance: " + distance(population[0], population[1]))
//console.log("Child: " + child(population[0], population[1]))

