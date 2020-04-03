var erd = joint.shapes.erd; // USING JOINTJS

var graph = new joint.dia.Graph();

var paper = new joint.dia.Paper({
    el: document.getElementById('myholder'),
    width: 1500,
    height: 1500,
    model: graph,
    linkPinning: false,
});

// FOR STORING THE REF TO ALL THE OBJECTS ON PAPER

var obj = [

]

var highlighter = V('path', {
    'stroke': '#e9fc03',
    'stroke-width': '2px',
    'fill': 'transparent',
    'pointer-events': 'none'
});

// CREATING LABEL

var createLabel = function(txt) {
    return {
        labels: [{
            position: -20,
            attrs: {
                text: { dy: -8, text: txt, fill: '#ffffff' },
                rect: { fill: 'none' }
            }
        }]
    };
};


// CREATING LINKS

var createLink = function(elm1, elm2) {

    var myLink = new erd.Line({
        markup: [
            '<path class="connection" stroke="white" d="M 0 0 0 0"/>',
            '<path class="connection-wrap" d="M 0 0 0 0"/>',
            '<g class="labels"/>',
            '<g class="marker-vertices"/>',
            '<g class="marker-arrowheads"/>'
        ].join(''),
        source: { id: elm1.id },
        target: { id: elm2.id }
    });

    return myLink.addTo(graph);
};

// CREATING ENTITIES

function addEntity(){
    var entityName = document.getElementById("entityName").value;

    if(entityName=='')return;

    var entityType = document.getElementById("entityType").value;

    if(entityType == 'strong'){
        var en = new erd.Entity({

            position: { x: 100, y: 200 },
            attrs: {
                text: {
                    fill: '#ffffff',
                    text: entityName,
                    letterSpacing: 0,
                    style: { textShadow: '1px 0 1px #333333' }
                },
                '.outer': {
                    fill: '#100cf5',
                    stroke: 'none',
                    filter: { name: 'dropShadow',  args: { dx: 0.5, dy: 2, blur: 2, color: '#333333' }}
                },
                '.inner': {
                    fill: '#100cf5',
                    stroke: 'none',
                    filter: { name: 'dropShadow',  args: { dx: 0.5, dy: 2, blur: 2, color: '#333333' }}
                }
            }
        });
        entityName = String(entityName);
        obj.push([entityName,en])
        en.addTo(graph)
    }else{
        var weaken = new erd.WeakEntity({

            position: { x: 530, y: 200 },
            attrs: {
                text: {
                    fill: '#ffffff',
                    text: entityName,
                    letterSpacing: 0,
                    style: { textShadow: '1px 0 1px #333333' }
                },
                '.inner': {
                    fill: '#36daff',
                    stroke: 'black',
                    points: '155,5 155,55 5,55 5,5'
                },
                '.outer': {
                    fill: 'none',
                    stroke: '#36daff',
                    points: '160,0 160,60 0,60 0,0',
                    filter: { name: 'dropShadow',  args: { dx: 0.5, dy: 2, blur: 2, color: '#333333' }}
                }
            }
        });
        entityName = String(entityName);
        obj.push([entityName,weaken])
        weaken.addTo(graph);
    }

    document.getElementById("entityName").value='';
}

// CREATING ATTRIBUTES

function addAttribute(){
    var entityName = document.getElementById("entityNameForAttribute").value;
    entityName = String(entityName);
    if(entityName=='')return;

    

    for(var i=0;i<obj.length;i++){
        if(obj[i][0]==entityName){
            var entity = obj[i][1];
            break;
        }
    }
    
    console.log('obj',obj)
    var attributeType = document.getElementById("attributeType").value;
    var attributeName = document.getElementById("attributeName").value;

    if(attributeType=="single"){
        var attr = new erd.Normal({

            position: { x: 75, y: 30 },
            attrs: {
                text: {
                    fill: '#ffffff',
                    text: attributeName,
                    letterSpacing: 0,
                    style: { textShadow: '1px 0 1px #333333' }
                },
                '.outer': {
                    fill: '#36ff72',
                    stroke: '#36ff72',
                    filter: { name: 'dropShadow',  args: { dx: 0, dy: 2, blur: 2, color: '#222138' }}
                }
            }
        });

    }else if(attributeType=="key"){

        var attr = new erd.Key({

            position: { x: 10, y: 90 },
            attrs: {
                text: {
                    fill: '#ffffff',
                    text: attributeName,
                    letterSpacing: 0,
                    style: { textShadow: '1px 0 1px #333333' }
                },
                '.outer': {
                    fill: '#ff2403',
                    stroke: 'none',
                    filter: { name: 'dropShadow',  args: { dx: 0, dy: 2, blur: 2, color: '#222138' }}
                },
                '.inner': {
                    fill: '#ff2403',
                    stroke: 'none'
                }
            }
        });

    }else if(attributeType=="derived"){

        var attr = new erd.Derived({

            position: { x: 440, y: 80 },
            attrs: {
                text: {
                    fill: '#ffffff',
                    text: attributeName,
                    letterSpacing: 0,
                    style: { textShadow: '1px 0 1px #333333' }
                },
                '.inner': {
                    fill: '#fff203',
                    stroke: 'none',
                    display: 'block'
                },
                '.outer': {
                    fill: '#464a65',
                    stroke: '#fff203',
                    'stroke-dasharray': '3,1',
                    filter: { name: 'dropShadow',  args: { dx: 0, dy: 2, blur: 2, color: '#222138' }}
                }
            }
        });

    }else if(attributeType=="multi_valued"){

        var attr = new erd.Multivalued({

            position: { x: 150, y: 90 },
            attrs: {
                text: {
                    fill: '#ffffff',
                    text: attributeName,
                    letterSpacing: 0,
                    style: { 'text-shadow': '1px 0px 1px #333333' }
                },
                '.inner': {
                    fill: '#fe8550',
                    stroke: 'none',
                    rx: 43,
                    ry: 21
        
                },
                '.outer': {
                    fill: '#464a65',
                    stroke: '#fe8550',
                    filter: { name: 'dropShadow',  args: { dx: 0, dy: 2, blur: 2, color: '#222138' }}
                }
            }
        });
    }



    if(entity==undefined || attr==undefined){
        alert('entity or attribute not found or undefined');
        return;
    }



    attr.addTo(graph);
    createLink(entity,attr);

    document.getElementById("attributeName").value='';
    document.getElementById("entityNameForAttribute").value='';

}

// CREATING RELATIONSHIP

function createRelationship(){
    var entity1 = document.getElementById("entity1Rel").value;
    var entity2 = document.getElementById("entity2Rel").value;
    var relation = document.getElementById("relName").value;

    if(entity1 == entity2){
        alert('both are same!!')
        return;
    }

    for(var i=0;i<obj.length;i++){
        if(obj[i][0]==entity1){
            var en1 = obj[i][1];
            break;
        }
    }

    for(var i=0;i<obj.length;i++){
        if(obj[i][0]==entity2){
            var en2 = obj[i][1];
            break;
        }
    }

    if(en1==undefined || en2==undefined){
        alert('error in finding both');
        return;
    }

    var reltype = document.getElementById("relType").value;
    if(reltype == 'isa'){
        var rel = new erd.ISA({

            position: { x: 125, y: 300 },
            attrs: {
                text: {
                    text: 'ISA',
                    fill: '#ffffff',
                    letterSpacing: 0,
                    style: { 'text-shadow': '1px 0 1px #333333' }
                },
                polygon: {
                    fill: '#fdb664',
                    stroke: 'none',
                    filter: { name: 'dropShadow',  args: { dx: 0, dy: 2, blur: 1, color: '#333333' }}
                }
            }
        });
    }else{
        var rel = new erd.Relationship({

            position: { x: 300, y: 390 },
            attrs: {
                text: {
                    fill: '#ffffff',
                    text: relation,
                    letterSpacing: 0,
                    style: { textShadow: '1px 0 1px #333333' }
                },
                '.outer': {
                    fill: '#797d9a',
                    stroke: 'Black',
                    filter: { name: 'dropShadow',  args: { dx: 0, dy: 2, blur: 1, color: '#333333' }}
                }
            }
        });
    }

    rel.addTo(graph);
    var lb1 = document.getElementById('entity1Val').value;
    var lb2 = document.getElementById('entity2Val').value;
    createLink(en1,rel).set(createLabel(lb1));
    createLink(en2,rel).set(createLabel(lb2));
    document.getElementById("entity1Rel").value = ""
    document.getElementById("entity2Rel").value="";
    document.getElementById("relName").value="";
}

// HIGHLIGHTING EFFECTS

erd.Attribute.prototype.getHighlighterPath = function(w, h) {

    return ['M', 0, h / 2, 'A', w / 2, h / 2, '0 1,0', w, h / 2, 'A', w / 2, h / 2, '0 1,0', 0, h / 2].join(' ');
};

erd.Entity.prototype.getHighlighterPath = function(w, h) {

    return ['M', w, 0, w, h, 0, h, 0, 0, 'z'].join(' ');
};

erd.Relationship.prototype.getHighlighterPath = function(w, h) {

    return ['M', w / 2, 0, w, w / 2, w / 2, w, 0, w / 2, 'z'].join(' ');
};

erd.Attribute.prototype.getConnectionPoint = function(referencePoint) {
    // Intersection with an ellipse
    return g.Ellipse.fromRect(this.getBBox()).intersectionWithLineFromCenterToPoint(referencePoint);
};

erd.Entity.prototype.getConnectionPoint = function(referencePoint) {
    // Intersection with a rectangle
    return this.getBBox().intersectionWithLineFromCenterToPoint(referencePoint);
};

erd.ISA.prototype.getHighlighterPath = function(w, h) {

    return ['M', -8, 1, w + 8, 1, w / 2, h + 2, 'z'].join(' ');
};

erd.Relationship.prototype.getConnectionPoint = function(referencePoint) {
    // Intersection with a rhomb
    var bbox = this.getBBox();
    var line = new g.Line(bbox.center(), referencePoint);
    return (
        line.intersection(new g.Line(bbox.topMiddle(), bbox.leftMiddle())) ||
        line.intersection(new g.Line(bbox.leftMiddle(), bbox.bottomMiddle())) ||
        line.intersection(new g.Line(bbox.bottomMiddle(), bbox.rightMiddle())) ||
        line.intersection(new g.Line(bbox.rightMiddle(), bbox.topMiddle()))
    );
};



