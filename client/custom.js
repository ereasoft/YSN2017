function getRefToDivMod( divID, oDoc ) {
  if( !oDoc ) { oDoc = document; }
  if( document.layers ) {
    if( oDoc.layers[divID] ) { return oDoc.layers[divID]; } else {
      for( var x = 0, y; !y && x < oDoc.layers.length; x++ ) {
        y = getRefToDivMod(divID,oDoc.layers[x].document); }
      return y; } }
  if( document.getElementById ) { return oDoc.getElementById(divID); }
  if( document.all ) { return oDoc.all[divID]; }
  return document[divID];
}

function openPerfectPopup(oW,oTitle,oContent) { 
  var x = window.open('','','width=500,height=400,resizable=1');
  if( !x ) { return true; }
  //x.document.close();
  x.document.open();
  x.document.write(
	  '<html><head><title>'+oTitle+'<\/title>'+
	  '<script>var Ext = Ext || {};Ext.manifest = \"classic\";var flag=\"1\";<\/script>'+
	  '<script id=\"microloader\" data-app=\"4dba8050-06b7-4b61-8dc2-72ea3b62cf2e\" type=\"text\/javascript\" src=\"bootstrap.js\"><\/script>'+
	  '<\/head><body><\/body><\/html>'
  );
  x.document.close();
  var oH = getRefToDivMod( 'myID', x.document ); if( !oH ) { return false; }
  var oH = oH.clip ? oH.clip.height : oH.offsetHeight; if( !oH ) { return false; }
  x.resizeTo( oW + 200, oH + 200 );
  var myW = 0, myH = 0, d = x.document.documentElement, b = x.document.body;
  if( x.innerWidth ) { myW = x.innerWidth; myH = x.innerHeight; }
  else if( d && d.clientWidth ) { myW = d.clientWidth; myH = d.clientHeight; }
  else if( b && b.clientWidth ) { myW = b.clientWidth; myH = b.clientHeight; }
  if( window.opera && !document.childNodes ) { myW += 16; }
  x.resizeTo( oW + ( ( oW + 200 ) - myW ), oH + ( (oH + 200 ) - myH ) );
  if( x.focus ) { x.focus(); }
  return false;
}

function openPopupView(oTitle,viewId,param1,param2,param3) { 
   window.open('index.aspx?flag=2&otitle='+oTitle+'&popview='+viewId+'&param1='+param1+'&param2='+param2,'popView','width=1000,height=800,resizable=1'); 
} 