/*
 * This combined file was created by the DataTables downloader builder:
 *   https://datatables.net/download
 *
 * To rebuild or modify this file with the latest versions of the included
 * software please visit:
 *   https://datatables.net/download/#dt/dt-1.10.12/r-2.1.0
 *
 * Included libraries:
 *   DataTables 1.10.12, Responsive 2.1.0
 */

/*!
 DataTables 1.10.12
 ©2008-2015 SpryMedia Ltd - datatables.net/license
*/
(function(h){"function"===typeof define&&define.amd?define(["jquery"],function(D){return h(D,window,document)}):"object"===typeof exports?module.exports=function(D,I){D||(D=window);I||(I="undefined"!==typeof window?require("jquery"):require("jquery")(D));return h(I,D,D.document)}:h(jQuery,window,document)})(function(h,D,I,k){function X(a){var b,c,d={};h.each(a,function(e){if((b=e.match(/^([^A-Z]+?)([A-Z])/))&&-1!=="a aa ai ao as b fn i m o s ".indexOf(b[1]+" "))c=e.replace(b[0],b[2].toLowerCase()),
d[c]=e,"o"===b[1]&&X(a[e])});a._hungarianMap=d}function K(a,b,c){a._hungarianMap||X(a);var d;h.each(b,function(e){d=a._hungarianMap[e];if(d!==k&&(c||b[d]===k))"o"===d.charAt(0)?(b[d]||(b[d]={}),h.extend(!0,b[d],b[e]),K(a[d],b[d],c)):b[d]=b[e]})}function Da(a){var b=m.defaults.oLanguage,c=a.sZeroRecords;!a.sEmptyTable&&(c&&"No data available in table"===b.sEmptyTable)&&E(a,a,"sZeroRecords","sEmptyTable");!a.sLoadingRecords&&(c&&"Loading..."===b.sLoadingRecords)&&E(a,a,"sZeroRecords","sLoadingRecords");
a.sInfoThousands&&(a.sThousands=a.sInfoThousands);(a=a.sDecimal)&&db(a)}function eb(a){A(a,"ordering","bSort");A(a,"orderMulti","bSortMulti");A(a,"orderClasses","bSortClasses");A(a,"orderCellsTop","bSortCellsTop");A(a,"order","aaSorting");A(a,"orderFixed","aaSortingFixed");A(a,"paging","bPaginate");A(a,"pagingType","sPaginationType");A(a,"pageLength","iDisplayLength");A(a,"searching","bFilter");"boolean"===typeof a.sScrollX&&(a.sScrollX=a.sScrollX?"100%":"");"boolean"===typeof a.scrollX&&(a.scrollX=
a.scrollX?"100%":"");if(a=a.aoSearchCols)for(var b=0,c=a.length;b<c;b++)a[b]&&K(m.models.oSearch,a[b])}function fb(a){A(a,"orderable","bSortable");A(a,"orderData","aDataSort");A(a,"orderSequence","asSorting");A(a,"orderDataType","sortDataType");var b=a.aDataSort;b&&!h.isArray(b)&&(a.aDataSort=[b])}function gb(a){if(!m.__browser){var b={};m.__browser=b;var c=h("<div/>").css({position:"fixed",top:0,left:0,height:1,width:1,overflow:"hidden"}).append(h("<div/>").css({position:"absolute",top:1,left:1,
width:100,overflow:"scroll"}).append(h("<div/>").css({width:"100%",height:10}))).appendTo("body"),d=c.children(),e=d.children();b.barWidth=d[0].offsetWidth-d[0].clientWidth;b.bScrollOversize=100===e[0].offsetWidth&&100!==d[0].clientWidth;b.bScrollbarLeft=1!==Math.round(e.offset().left);b.bBounding=c[0].getBoundingClientRect().width?!0:!1;c.remove()}h.extend(a.oBrowser,m.__browser);a.oScroll.iBarWidth=m.__browser.barWidth}function hb(a,b,c,d,e,f){var g,j=!1;c!==k&&(g=c,j=!0);for(;d!==e;)a.hasOwnProperty(d)&&
(g=j?b(g,a[d],d,a):a[d],j=!0,d+=f);return g}function Ea(a,b){var c=m.defaults.column,d=a.aoColumns.length,c=h.extend({},m.models.oColumn,c,{nTh:b?b:I.createElement("th"),sTitle:c.sTitle?c.sTitle:b?b.innerHTML:"",aDataSort:c.aDataSort?c.aDataSort:[d],mData:c.mData?c.mData:d,idx:d});a.aoColumns.push(c);c=a.aoPreSearchCols;c[d]=h.extend({},m.models.oSearch,c[d]);ja(a,d,h(b).data())}function ja(a,b,c){var b=a.aoColumns[b],d=a.oClasses,e=h(b.nTh);if(!b.sWidthOrig){b.sWidthOrig=e.attr("width")||null;var f=
(e.attr("style")||"").match(/width:\s*(\d+[pxem%]+)/);f&&(b.sWidthOrig=f[1])}c!==k&&null!==c&&(fb(c),K(m.defaults.column,c),c.mDataProp!==k&&!c.mData&&(c.mData=c.mDataProp),c.sType&&(b._sManualType=c.sType),c.className&&!c.sClass&&(c.sClass=c.className),h.extend(b,c),E(b,c,"sWidth","sWidthOrig"),c.iDataSort!==k&&(b.aDataSort=[c.iDataSort]),E(b,c,"aDataSort"));var g=b.mData,j=Q(g),i=b.mRender?Q(b.mRender):null,c=function(a){return"string"===typeof a&&-1!==a.indexOf("@")};b._bAttrSrc=h.isPlainObject(g)&&
(c(g.sort)||c(g.type)||c(g.filter));b._setter=null;b.fnGetData=function(a,b,c){var d=j(a,b,k,c);return i&&b?i(d,b,a,c):d};b.fnSetData=function(a,b,c){return R(g)(a,b,c)};"number"!==typeof g&&(a._rowReadObject=!0);a.oFeatures.bSort||(b.bSortable=!1,e.addClass(d.sSortableNone));a=-1!==h.inArray("asc",b.asSorting);c=-1!==h.inArray("desc",b.asSorting);!b.bSortable||!a&&!c?(b.sSortingClass=d.sSortableNone,b.sSortingClassJUI=""):a&&!c?(b.sSortingClass=d.sSortableAsc,b.sSortingClassJUI=d.sSortJUIAscAllowed):
!a&&c?(b.sSortingClass=d.sSortableDesc,b.sSortingClassJUI=d.sSortJUIDescAllowed):(b.sSortingClass=d.sSortable,b.sSortingClassJUI=d.sSortJUI)}function Y(a){if(!1!==a.oFeatures.bAutoWidth){var b=a.aoColumns;Fa(a);for(var c=0,d=b.length;c<d;c++)b[c].nTh.style.width=b[c].sWidth}b=a.oScroll;(""!==b.sY||""!==b.sX)&&ka(a);u(a,null,"column-sizing",[a])}function Z(a,b){var c=la(a,"bVisible");return"number"===typeof c[b]?c[b]:null}function $(a,b){var c=la(a,"bVisible"),c=h.inArray(b,c);return-1!==c?c:null}
function aa(a){var b=0;h.each(a.aoColumns,function(a,d){d.bVisible&&"none"!==h(d.nTh).css("display")&&b++});return b}function la(a,b){var c=[];h.map(a.aoColumns,function(a,e){a[b]&&c.push(e)});return c}function Ga(a){var b=a.aoColumns,c=a.aoData,d=m.ext.type.detect,e,f,g,j,i,h,l,q,t;e=0;for(f=b.length;e<f;e++)if(l=b[e],t=[],!l.sType&&l._sManualType)l.sType=l._sManualType;else if(!l.sType){g=0;for(j=d.length;g<j;g++){i=0;for(h=c.length;i<h;i++){t[i]===k&&(t[i]=B(a,i,e,"type"));q=d[g](t[i],a);if(!q&&
g!==d.length-1)break;if("html"===q)break}if(q){l.sType=q;break}}l.sType||(l.sType="string")}}function ib(a,b,c,d){var e,f,g,j,i,n,l=a.aoColumns;if(b)for(e=b.length-1;0<=e;e--){n=b[e];var q=n.targets!==k?n.targets:n.aTargets;h.isArray(q)||(q=[q]);f=0;for(g=q.length;f<g;f++)if("number"===typeof q[f]&&0<=q[f]){for(;l.length<=q[f];)Ea(a);d(q[f],n)}else if("number"===typeof q[f]&&0>q[f])d(l.length+q[f],n);else if("string"===typeof q[f]){j=0;for(i=l.length;j<i;j++)("_all"==q[f]||h(l[j].nTh).hasClass(q[f]))&&
d(j,n)}}if(c){e=0;for(a=c.length;e<a;e++)d(e,c[e])}}function N(a,b,c,d){var e=a.aoData.length,f=h.extend(!0,{},m.models.oRow,{src:c?"dom":"data",idx:e});f._aData=b;a.aoData.push(f);for(var g=a.aoColumns,j=0,i=g.length;j<i;j++)g[j].sType=null;a.aiDisplayMaster.push(e);b=a.rowIdFn(b);b!==k&&(a.aIds[b]=f);(c||!a.oFeatures.bDeferRender)&&Ha(a,e,c,d);return e}function ma(a,b){var c;b instanceof h||(b=h(b));return b.map(function(b,e){c=Ia(a,e);return N(a,c.data,e,c.cells)})}function B(a,b,c,d){var e=a.iDraw,
f=a.aoColumns[c],g=a.aoData[b]._aData,j=f.sDefaultContent,i=f.fnGetData(g,d,{settings:a,row:b,col:c});if(i===k)return a.iDrawError!=e&&null===j&&(L(a,0,"Requested unknown parameter "+("function"==typeof f.mData?"{function}":"'"+f.mData+"'")+" for row "+b+", column "+c,4),a.iDrawError=e),j;if((i===g||null===i)&&null!==j&&d!==k)i=j;else if("function"===typeof i)return i.call(g);return null===i&&"display"==d?"":i}function jb(a,b,c,d){a.aoColumns[c].fnSetData(a.aoData[b]._aData,d,{settings:a,row:b,col:c})}
function Ja(a){return h.map(a.match(/(\\.|[^\.])+/g)||[""],function(a){return a.replace(/\\./g,".")})}function Q(a){if(h.isPlainObject(a)){var b={};h.each(a,function(a,c){c&&(b[a]=Q(c))});return function(a,c,f,g){var j=b[c]||b._;return j!==k?j(a,c,f,g):a}}if(null===a)return function(a){return a};if("function"===typeof a)return function(b,c,f,g){return a(b,c,f,g)};if("string"===typeof a&&(-1!==a.indexOf(".")||-1!==a.indexOf("[")||-1!==a.indexOf("("))){var c=function(a,b,f){var g,j;if(""!==f){j=Ja(f);
for(var i=0,n=j.length;i<n;i++){f=j[i].match(ba);g=j[i].match(U);if(f){j[i]=j[i].replace(ba,"");""!==j[i]&&(a=a[j[i]]);g=[];j.splice(0,i+1);j=j.join(".");if(h.isArray(a)){i=0;for(n=a.length;i<n;i++)g.push(c(a[i],b,j))}a=f[0].substring(1,f[0].length-1);a=""===a?g:g.join(a);break}else if(g){j[i]=j[i].replace(U,"");a=a[j[i]]();continue}if(null===a||a[j[i]]===k)return k;a=a[j[i]]}}return a};return function(b,e){return c(b,e,a)}}return function(b){return b[a]}}function R(a){if(h.isPlainObject(a))return R(a._);
if(null===a)return function(){};if("function"===typeof a)return function(b,d,e){a(b,"set",d,e)};if("string"===typeof a&&(-1!==a.indexOf(".")||-1!==a.indexOf("[")||-1!==a.indexOf("("))){var b=function(a,d,e){var e=Ja(e),f;f=e[e.length-1];for(var g,j,i=0,n=e.length-1;i<n;i++){g=e[i].match(ba);j=e[i].match(U);if(g){e[i]=e[i].replace(ba,"");a[e[i]]=[];f=e.slice();f.splice(0,i+1);g=f.join(".");if(h.isArray(d)){j=0;for(n=d.length;j<n;j++)f={},b(f,d[j],g),a[e[i]].push(f)}else a[e[i]]=d;return}j&&(e[i]=e[i].replace(U,
""),a=a[e[i]](d));if(null===a[e[i]]||a[e[i]]===k)a[e[i]]={};a=a[e[i]]}if(f.match(U))a[f.replace(U,"")](d);else a[f.replace(ba,"")]=d};return function(c,d){return b(c,d,a)}}return function(b,d){b[a]=d}}function Ka(a){return G(a.aoData,"_aData")}function na(a){a.aoData.length=0;a.aiDisplayMaster.length=0;a.aiDisplay.length=0;a.aIds={}}function oa(a,b,c){for(var d=-1,e=0,f=a.length;e<f;e++)a[e]==b?d=e:a[e]>b&&a[e]--; -1!=d&&c===k&&a.splice(d,1)}function ca(a,b,c,d){var e=a.aoData[b],f,g=function(c,d){for(;c.childNodes.length;)c.removeChild(c.firstChild);
c.innerHTML=B(a,b,d,"display")};if("dom"===c||(!c||"auto"===c)&&"dom"===e.src)e._aData=Ia(a,e,d,d===k?k:e._aData).data;else{var j=e.anCells;if(j)if(d!==k)g(j[d],d);else{c=0;for(f=j.length;c<f;c++)g(j[c],c)}}e._aSortData=null;e._aFilterData=null;g=a.aoColumns;if(d!==k)g[d].sType=null;else{c=0;for(f=g.length;c<f;c++)g[c].sType=null;La(a,e)}}function Ia(a,b,c,d){var e=[],f=b.firstChild,g,j,i=0,n,l=a.aoColumns,q=a._rowReadObject,d=d!==k?d:q?{}:[],t=function(a,b){if("string"===typeof a){var c=a.indexOf("@");
-1!==c&&(c=a.substring(c+1),R(a)(d,b.getAttribute(c)))}},S=function(a){if(c===k||c===i)j=l[i],n=h.trim(a.innerHTML),j&&j._bAttrSrc?(R(j.mData._)(d,n),t(j.mData.sort,a),t(j.mData.type,a),t(j.mData.filter,a)):q?(j._setter||(j._setter=R(j.mData)),j._setter(d,n)):d[i]=n;i++};if(f)for(;f;){g=f.nodeName.toUpperCase();if("TD"==g||"TH"==g)S(f),e.push(f);f=f.nextSibling}else{e=b.anCells;f=0;for(g=e.length;f<g;f++)S(e[f])}if(b=b.firstChild?b:b.nTr)(b=b.getAttribute("id"))&&R(a.rowId)(d,b);return{data:d,cells:e}}
function Ha(a,b,c,d){var e=a.aoData[b],f=e._aData,g=[],j,i,n,l,q;if(null===e.nTr){j=c||I.createElement("tr");e.nTr=j;e.anCells=g;j._DT_RowIndex=b;La(a,e);l=0;for(q=a.aoColumns.length;l<q;l++){n=a.aoColumns[l];i=c?d[l]:I.createElement(n.sCellType);i._DT_CellIndex={row:b,column:l};g.push(i);if((!c||n.mRender||n.mData!==l)&&(!h.isPlainObject(n.mData)||n.mData._!==l+".display"))i.innerHTML=B(a,b,l,"display");n.sClass&&(i.className+=" "+n.sClass);n.bVisible&&!c?j.appendChild(i):!n.bVisible&&c&&i.parentNode.removeChild(i);
n.fnCreatedCell&&n.fnCreatedCell.call(a.oInstance,i,B(a,b,l),f,b,l)}u(a,"aoRowCreatedCallback",null,[j,f,b])}e.nTr.setAttribute("role","row")}function La(a,b){var c=b.nTr,d=b._aData;if(c){var e=a.rowIdFn(d);e&&(c.id=e);d.DT_RowClass&&(e=d.DT_RowClass.split(" "),b.__rowc=b.__rowc?pa(b.__rowc.concat(e)):e,h(c).removeClass(b.__rowc.join(" ")).addClass(d.DT_RowClass));d.DT_RowAttr&&h(c).attr(d.DT_RowAttr);d.DT_RowData&&h(c).data(d.DT_RowData)}}function kb(a){var b,c,d,e,f,g=a.nTHead,j=a.nTFoot,i=0===
h("th, td",g).length,n=a.oClasses,l=a.aoColumns;i&&(e=h("<tr/>").appendTo(g));b=0;for(c=l.length;b<c;b++)f=l[b],d=h(f.nTh).addClass(f.sClass),i&&d.appendTo(e),a.oFeatures.bSort&&(d.addClass(f.sSortingClass),!1!==f.bSortable&&(d.attr("tabindex",a.iTabIndex).attr("aria-controls",a.sTableId),Ma(a,f.nTh,b))),f.sTitle!=d[0].innerHTML&&d.html(f.sTitle),Na(a,"header")(a,d,f,n);i&&da(a.aoHeader,g);h(g).find(">tr").attr("role","row");h(g).find(">tr>th, >tr>td").addClass(n.sHeaderTH);h(j).find(">tr>th, >tr>td").addClass(n.sFooterTH);
if(null!==j){a=a.aoFooter[0];b=0;for(c=a.length;b<c;b++)f=l[b],f.nTf=a[b].cell,f.sClass&&h(f.nTf).addClass(f.sClass)}}function ea(a,b,c){var d,e,f,g=[],j=[],i=a.aoColumns.length,n;if(b){c===k&&(c=!1);d=0;for(e=b.length;d<e;d++){g[d]=b[d].slice();g[d].nTr=b[d].nTr;for(f=i-1;0<=f;f--)!a.aoColumns[f].bVisible&&!c&&g[d].splice(f,1);j.push([])}d=0;for(e=g.length;d<e;d++){if(a=g[d].nTr)for(;f=a.firstChild;)a.removeChild(f);f=0;for(b=g[d].length;f<b;f++)if(n=i=1,j[d][f]===k){a.appendChild(g[d][f].cell);
for(j[d][f]=1;g[d+i]!==k&&g[d][f].cell==g[d+i][f].cell;)j[d+i][f]=1,i++;for(;g[d][f+n]!==k&&g[d][f].cell==g[d][f+n].cell;){for(c=0;c<i;c++)j[d+c][f+n]=1;n++}h(g[d][f].cell).attr("rowspan",i).attr("colspan",n)}}}}function O(a){var b=u(a,"aoPreDrawCallback","preDraw",[a]);if(-1!==h.inArray(!1,b))C(a,!1);else{var b=[],c=0,d=a.asStripeClasses,e=d.length,f=a.oLanguage,g=a.iInitDisplayStart,j="ssp"==y(a),i=a.aiDisplay;a.bDrawing=!0;g!==k&&-1!==g&&(a._iDisplayStart=j?g:g>=a.fnRecordsDisplay()?0:g,a.iInitDisplayStart=
-1);var g=a._iDisplayStart,n=a.fnDisplayEnd();if(a.bDeferLoading)a.bDeferLoading=!1,a.iDraw++,C(a,!1);else if(j){if(!a.bDestroying&&!lb(a))return}else a.iDraw++;if(0!==i.length){f=j?a.aoData.length:n;for(j=j?0:g;j<f;j++){var l=i[j],q=a.aoData[l];null===q.nTr&&Ha(a,l);l=q.nTr;if(0!==e){var t=d[c%e];q._sRowStripe!=t&&(h(l).removeClass(q._sRowStripe).addClass(t),q._sRowStripe=t)}u(a,"aoRowCallback",null,[l,q._aData,c,j]);b.push(l);c++}}else c=f.sZeroRecords,1==a.iDraw&&"ajax"==y(a)?c=f.sLoadingRecords:
f.sEmptyTable&&0===a.fnRecordsTotal()&&(c=f.sEmptyTable),b[0]=h("<tr/>",{"class":e?d[0]:""}).append(h("<td />",{valign:"top",colSpan:aa(a),"class":a.oClasses.sRowEmpty}).html(c))[0];u(a,"aoHeaderCallback","header",[h(a.nTHead).children("tr")[0],Ka(a),g,n,i]);u(a,"aoFooterCallback","footer",[h(a.nTFoot).children("tr")[0],Ka(a),g,n,i]);d=h(a.nTBody);d.children().detach();d.append(h(b));u(a,"aoDrawCallback","draw",[a]);a.bSorted=!1;a.bFiltered=!1;a.bDrawing=!1}}function T(a,b){var c=a.oFeatures,d=c.bFilter;
c.bSort&&mb(a);d?fa(a,a.oPreviousSearch):a.aiDisplay=a.aiDisplayMaster.slice();!0!==b&&(a._iDisplayStart=0);a._drawHold=b;O(a);a._drawHold=!1}function nb(a){var b=a.oClasses,c=h(a.nTable),c=h("<div/>").insertBefore(c),d=a.oFeatures,e=h("<div/>",{id:a.sTableId+"_wrapper","class":b.sWrapper+(a.nTFoot?"":" "+b.sNoFooter)});a.nHolding=c[0];a.nTableWrapper=e[0];a.nTableReinsertBefore=a.nTable.nextSibling;for(var f=a.sDom.split(""),g,j,i,n,l,q,t=0;t<f.length;t++){g=null;j=f[t];if("<"==j){i=h("<div/>")[0];
n=f[t+1];if("'"==n||'"'==n){l="";for(q=2;f[t+q]!=n;)l+=f[t+q],q++;"H"==l?l=b.sJUIHeader:"F"==l&&(l=b.sJUIFooter);-1!=l.indexOf(".")?(n=l.split("."),i.id=n[0].substr(1,n[0].length-1),i.className=n[1]):"#"==l.charAt(0)?i.id=l.substr(1,l.length-1):i.className=l;t+=q}e.append(i);e=h(i)}else if(">"==j)e=e.parent();else if("l"==j&&d.bPaginate&&d.bLengthChange)g=ob(a);else if("f"==j&&d.bFilter)g=pb(a);else if("r"==j&&d.bProcessing)g=qb(a);else if("t"==j)g=rb(a);else if("i"==j&&d.bInfo)g=sb(a);else if("p"==
j&&d.bPaginate)g=tb(a);else if(0!==m.ext.feature.length){i=m.ext.feature;q=0;for(n=i.length;q<n;q++)if(j==i[q].cFeature){g=i[q].fnInit(a);break}}g&&(i=a.aanFeatures,i[j]||(i[j]=[]),i[j].push(g),e.append(g))}c.replaceWith(e);a.nHolding=null}function da(a,b){var c=h(b).children("tr"),d,e,f,g,j,i,n,l,q,t;a.splice(0,a.length);f=0;for(i=c.length;f<i;f++)a.push([]);f=0;for(i=c.length;f<i;f++){d=c[f];for(e=d.firstChild;e;){if("TD"==e.nodeName.toUpperCase()||"TH"==e.nodeName.toUpperCase()){l=1*e.getAttribute("colspan");
q=1*e.getAttribute("rowspan");l=!l||0===l||1===l?1:l;q=!q||0===q||1===q?1:q;g=0;for(j=a[f];j[g];)g++;n=g;t=1===l?!0:!1;for(j=0;j<l;j++)for(g=0;g<q;g++)a[f+g][n+j]={cell:e,unique:t},a[f+g].nTr=d}e=e.nextSibling}}}function qa(a,b,c){var d=[];c||(c=a.aoHeader,b&&(c=[],da(c,b)));for(var b=0,e=c.length;b<e;b++)for(var f=0,g=c[b].length;f<g;f++)if(c[b][f].unique&&(!d[f]||!a.bSortCellsTop))d[f]=c[b][f].cell;return d}function ra(a,b,c){u(a,"aoServerParams","serverParams",[b]);if(b&&h.isArray(b)){var d={},
e=/(.*?)\[\]$/;h.each(b,function(a,b){var c=b.name.match(e);c?(c=c[0],d[c]||(d[c]=[]),d[c].push(b.value)):d[b.name]=b.value});b=d}var f,g=a.ajax,j=a.oInstance,i=function(b){u(a,null,"xhr",[a,b,a.jqXHR]);c(b)};if(h.isPlainObject(g)&&g.data){f=g.data;var n=h.isFunction(f)?f(b,a):f,b=h.isFunction(f)&&n?n:h.extend(!0,b,n);delete g.data}n={data:b,success:function(b){var c=b.error||b.sError;c&&L(a,0,c);a.json=b;i(b)},dataType:"json",cache:!1,type:a.sServerMethod,error:function(b,c){var d=u(a,null,"xhr",
[a,null,a.jqXHR]);-1===h.inArray(!0,d)&&("parsererror"==c?L(a,0,"Invalid JSON response",1):4===b.readyState&&L(a,0,"Ajax error",7));C(a,!1)}};a.oAjaxData=b;u(a,null,"preXhr",[a,b]);a.fnServerData?a.fnServerData.call(j,a.sAjaxSource,h.map(b,function(a,b){return{name:b,value:a}}),i,a):a.sAjaxSource||"string"===typeof g?a.jqXHR=h.ajax(h.extend(n,{url:g||a.sAjaxSource})):h.isFunction(g)?a.jqXHR=g.call(j,b,i,a):(a.jqXHR=h.ajax(h.extend(n,g)),g.data=f)}function lb(a){return a.bAjaxDataGet?(a.iDraw++,C(a,
!0),ra(a,ub(a),function(b){vb(a,b)}),!1):!0}function ub(a){var b=a.aoColumns,c=b.length,d=a.oFeatures,e=a.oPreviousSearch,f=a.aoPreSearchCols,g,j=[],i,n,l,q=V(a);g=a._iDisplayStart;i=!1!==d.bPaginate?a._iDisplayLength:-1;var k=function(a,b){j.push({name:a,value:b})};k("sEcho",a.iDraw);k("iColumns",c);k("sColumns",G(b,"sName").join(","));k("iDisplayStart",g);k("iDisplayLength",i);var S={draw:a.iDraw,columns:[],order:[],start:g,length:i,search:{value:e.sSearch,regex:e.bRegex}};for(g=0;g<c;g++)n=b[g],
l=f[g],i="function"==typeof n.mData?"function":n.mData,S.columns.push({data:i,name:n.sName,searchable:n.bSearchable,orderable:n.bSortable,search:{value:l.sSearch,regex:l.bRegex}}),k("mDataProp_"+g,i),d.bFilter&&(k("sSearch_"+g,l.sSearch),k("bRegex_"+g,l.bRegex),k("bSearchable_"+g,n.bSearchable)),d.bSort&&k("bSortable_"+g,n.bSortable);d.bFilter&&(k("sSearch",e.sSearch),k("bRegex",e.bRegex));d.bSort&&(h.each(q,function(a,b){S.order.push({column:b.col,dir:b.dir});k("iSortCol_"+a,b.col);k("sSortDir_"+
a,b.dir)}),k("iSortingCols",q.length));b=m.ext.legacy.ajax;return null===b?a.sAjaxSource?j:S:b?j:S}function vb(a,b){var c=sa(a,b),d=b.sEcho!==k?b.sEcho:b.draw,e=b.iTotalRecords!==k?b.iTotalRecords:b.recordsTotal,f=b.iTotalDisplayRecords!==k?b.iTotalDisplayRecords:b.recordsFiltered;if(d){if(1*d<a.iDraw)return;a.iDraw=1*d}na(a);a._iRecordsTotal=parseInt(e,10);a._iRecordsDisplay=parseInt(f,10);d=0;for(e=c.length;d<e;d++)N(a,c[d]);a.aiDisplay=a.aiDisplayMaster.slice();a.bAjaxDataGet=!1;O(a);a._bInitComplete||
ta(a,b);a.bAjaxDataGet=!0;C(a,!1)}function sa(a,b){var c=h.isPlainObject(a.ajax)&&a.ajax.dataSrc!==k?a.ajax.dataSrc:a.sAjaxDataProp;return"data"===c?b.aaData||b[c]:""!==c?Q(c)(b):b}function pb(a){var b=a.oClasses,c=a.sTableId,d=a.oLanguage,e=a.oPreviousSearch,f=a.aanFeatures,g='<input type="search" class="'+b.sFilterInput+'"/>',j=d.sSearch,j=j.match(/_INPUT_/)?j.replace("_INPUT_",g):j+g,b=h("<div/>",{id:!f.f?c+"_filter":null,"class":b.sFilter}).append(h("<label/>").append(j)),f=function(){var b=!this.value?
"":this.value;b!=e.sSearch&&(fa(a,{sSearch:b,bRegex:e.bRegex,bSmart:e.bSmart,bCaseInsensitive:e.bCaseInsensitive}),a._iDisplayStart=0,O(a))},g=null!==a.searchDelay?a.searchDelay:"ssp"===y(a)?400:0,i=h("input",b).val(e.sSearch).attr("placeholder",d.sSearchPlaceholder).bind("keyup.DT search.DT input.DT paste.DT cut.DT",g?Oa(f,g):f).bind("keypress.DT",function(a){if(13==a.keyCode)return!1}).attr("aria-controls",c);h(a.nTable).on("search.dt.DT",function(b,c){if(a===c)try{i[0]!==I.activeElement&&i.val(e.sSearch)}catch(d){}});
return b[0]}function fa(a,b,c){var d=a.oPreviousSearch,e=a.aoPreSearchCols,f=function(a){d.sSearch=a.sSearch;d.bRegex=a.bRegex;d.bSmart=a.bSmart;d.bCaseInsensitive=a.bCaseInsensitive};Ga(a);if("ssp"!=y(a)){wb(a,b.sSearch,c,b.bEscapeRegex!==k?!b.bEscapeRegex:b.bRegex,b.bSmart,b.bCaseInsensitive);f(b);for(b=0;b<e.length;b++)xb(a,e[b].sSearch,b,e[b].bEscapeRegex!==k?!e[b].bEscapeRegex:e[b].bRegex,e[b].bSmart,e[b].bCaseInsensitive);yb(a)}else f(b);a.bFiltered=!0;u(a,null,"search",[a])}function yb(a){for(var b=
m.ext.search,c=a.aiDisplay,d,e,f=0,g=b.length;f<g;f++){for(var j=[],i=0,n=c.length;i<n;i++)e=c[i],d=a.aoData[e],b[f](a,d._aFilterData,e,d._aData,i)&&j.push(e);c.length=0;h.merge(c,j)}}function xb(a,b,c,d,e,f){if(""!==b)for(var g=a.aiDisplay,d=Pa(b,d,e,f),e=g.length-1;0<=e;e--)b=a.aoData[g[e]]._aFilterData[c],d.test(b)||g.splice(e,1)}function wb(a,b,c,d,e,f){var d=Pa(b,d,e,f),e=a.oPreviousSearch.sSearch,f=a.aiDisplayMaster,g;0!==m.ext.search.length&&(c=!0);g=zb(a);if(0>=b.length)a.aiDisplay=f.slice();
else{if(g||c||e.length>b.length||0!==b.indexOf(e)||a.bSorted)a.aiDisplay=f.slice();b=a.aiDisplay;for(c=b.length-1;0<=c;c--)d.test(a.aoData[b[c]]._sFilterRow)||b.splice(c,1)}}function Pa(a,b,c,d){a=b?a:Qa(a);c&&(a="^(?=.*?"+h.map(a.match(/"[^"]+"|[^ ]+/g)||[""],function(a){if('"'===a.charAt(0))var b=a.match(/^"(.*)"$/),a=b?b[1]:a;return a.replace('"',"")}).join(")(?=.*?")+").*$");return RegExp(a,d?"i":"")}function zb(a){var b=a.aoColumns,c,d,e,f,g,j,i,h,l=m.ext.type.search;c=!1;d=0;for(f=a.aoData.length;d<
f;d++)if(h=a.aoData[d],!h._aFilterData){j=[];e=0;for(g=b.length;e<g;e++)c=b[e],c.bSearchable?(i=B(a,d,e,"filter"),l[c.sType]&&(i=l[c.sType](i)),null===i&&(i=""),"string"!==typeof i&&i.toString&&(i=i.toString())):i="",i.indexOf&&-1!==i.indexOf("&")&&(ua.innerHTML=i,i=Zb?ua.textContent:ua.innerText),i.replace&&(i=i.replace(/[\r\n]/g,"")),j.push(i);h._aFilterData=j;h._sFilterRow=j.join("  ");c=!0}return c}function Ab(a){return{search:a.sSearch,smart:a.bSmart,regex:a.bRegex,caseInsensitive:a.bCaseInsensitive}}
function Bb(a){return{sSearch:a.search,bSmart:a.smart,bRegex:a.regex,bCaseInsensitive:a.caseInsensitive}}function sb(a){var b=a.sTableId,c=a.aanFeatures.i,d=h("<div/>",{"class":a.oClasses.sInfo,id:!c?b+"_info":null});c||(a.aoDrawCallback.push({fn:Cb,sName:"information"}),d.attr("role","status").attr("aria-live","polite"),h(a.nTable).attr("aria-describedby",b+"_info"));return d[0]}function Cb(a){var b=a.aanFeatures.i;if(0!==b.length){var c=a.oLanguage,d=a._iDisplayStart+1,e=a.fnDisplayEnd(),f=a.fnRecordsTotal(),
g=a.fnRecordsDisplay(),j=g?c.sInfo:c.sInfoEmpty;g!==f&&(j+=" "+c.sInfoFiltered);j+=c.sInfoPostFix;j=Db(a,j);c=c.fnInfoCallback;null!==c&&(j=c.call(a.oInstance,a,d,e,f,g,j));h(b).html(j)}}function Db(a,b){var c=a.fnFormatNumber,d=a._iDisplayStart+1,e=a._iDisplayLength,f=a.fnRecordsDisplay(),g=-1===e;return b.replace(/_START_/g,c.call(a,d)).replace(/_END_/g,c.call(a,a.fnDisplayEnd())).replace(/_MAX_/g,c.call(a,a.fnRecordsTotal())).replace(/_TOTAL_/g,c.call(a,f)).replace(/_PAGE_/g,c.call(a,g?1:Math.ceil(d/
e))).replace(/_PAGES_/g,c.call(a,g?1:Math.ceil(f/e)))}function ga(a){var b,c,d=a.iInitDisplayStart,e=a.aoColumns,f;c=a.oFeatures;var g=a.bDeferLoading;if(a.bInitialised){nb(a);kb(a);ea(a,a.aoHeader);ea(a,a.aoFooter);C(a,!0);c.bAutoWidth&&Fa(a);b=0;for(c=e.length;b<c;b++)f=e[b],f.sWidth&&(f.nTh.style.width=x(f.sWidth));u(a,null,"preInit",[a]);T(a);e=y(a);if("ssp"!=e||g)"ajax"==e?ra(a,[],function(c){var f=sa(a,c);for(b=0;b<f.length;b++)N(a,f[b]);a.iInitDisplayStart=d;T(a);C(a,!1);ta(a,c)},a):(C(a,!1),
ta(a))}else setTimeout(function(){ga(a)},200)}function ta(a,b){a._bInitComplete=!0;(b||a.oInit.aaData)&&Y(a);u(a,null,"plugin-init",[a,b]);u(a,"aoInitComplete","init",[a,b])}function Ra(a,b){var c=parseInt(b,10);a._iDisplayLength=c;Sa(a);u(a,null,"length",[a,c])}function ob(a){for(var b=a.oClasses,c=a.sTableId,d=a.aLengthMenu,e=h.isArray(d[0]),f=e?d[0]:d,d=e?d[1]:d,e=h("<select/>",{name:c+"_length","aria-controls":c,"class":b.sLengthSelect}),g=0,j=f.length;g<j;g++)e[0][g]=new Option(d[g],f[g]);var i=
h("<div><label/></div>").addClass(b.sLength);a.aanFeatures.l||(i[0].id=c+"_length");i.children().append(a.oLanguage.sLengthMenu.replace("_MENU_",e[0].outerHTML));h("select",i).val(a._iDisplayLength).bind("change.DT",function(){Ra(a,h(this).val());O(a)});h(a.nTable).bind("length.dt.DT",function(b,c,d){a===c&&h("select",i).val(d)});return i[0]}function tb(a){var b=a.sPaginationType,c=m.ext.pager[b],d="function"===typeof c,e=function(a){O(a)},b=h("<div/>").addClass(a.oClasses.sPaging+b)[0],f=a.aanFeatures;
d||c.fnInit(a,b,e);f.p||(b.id=a.sTableId+"_paginate",a.aoDrawCallback.push({fn:function(a){if(d){var b=a._iDisplayStart,i=a._iDisplayLength,h=a.fnRecordsDisplay(),l=-1===i,b=l?0:Math.ceil(b/i),i=l?1:Math.ceil(h/i),h=c(b,i),k,l=0;for(k=f.p.length;l<k;l++)Na(a,"pageButton")(a,f.p[l],l,h,b,i)}else c.fnUpdate(a,e)},sName:"pagination"}));return b}function Ta(a,b,c){var d=a._iDisplayStart,e=a._iDisplayLength,f=a.fnRecordsDisplay();0===f||-1===e?d=0:"number"===typeof b?(d=b*e,d>f&&(d=0)):"first"==b?d=0:
"previous"==b?(d=0<=e?d-e:0,0>d&&(d=0)):"next"==b?d+e<f&&(d+=e):"last"==b?d=Math.floor((f-1)/e)*e:L(a,0,"Unknown paging action: "+b,5);b=a._iDisplayStart!==d;a._iDisplayStart=d;b&&(u(a,null,"page",[a]),c&&O(a));return b}function qb(a){return h("<div/>",{id:!a.aanFeatures.r?a.sTableId+"_processing":null,"class":a.oClasses.sProcessing}).html(a.oLanguage.sProcessing).insertBefore(a.nTable)[0]}function C(a,b){a.oFeatures.bProcessing&&h(a.aanFeatures.r).css("display",b?"block":"none");u(a,null,"processing",
[a,b])}function rb(a){var b=h(a.nTable);b.attr("role","grid");var c=a.oScroll;if(""===c.sX&&""===c.sY)return a.nTable;var d=c.sX,e=c.sY,f=a.oClasses,g=b.children("caption"),j=g.length?g[0]._captionSide:null,i=h(b[0].cloneNode(!1)),n=h(b[0].cloneNode(!1)),l=b.children("tfoot");l.length||(l=null);i=h("<div/>",{"class":f.sScrollWrapper}).append(h("<div/>",{"class":f.sScrollHead}).css({overflow:"hidden",position:"relative",border:0,width:d?!d?null:x(d):"100%"}).append(h("<div/>",{"class":f.sScrollHeadInner}).css({"box-sizing":"content-box",
width:c.sXInner||"100%"}).append(i.removeAttr("id").css("margin-left",0).append("top"===j?g:null).append(b.children("thead"))))).append(h("<div/>",{"class":f.sScrollBody}).css({position:"relative",overflow:"auto",width:!d?null:x(d)}).append(b));l&&i.append(h("<div/>",{"class":f.sScrollFoot}).css({overflow:"hidden",border:0,width:d?!d?null:x(d):"100%"}).append(h("<div/>",{"class":f.sScrollFootInner}).append(n.removeAttr("id").css("margin-left",0).append("bottom"===j?g:null).append(b.children("tfoot")))));
var b=i.children(),k=b[0],f=b[1],t=l?b[2]:null;if(d)h(f).on("scroll.DT",function(){var a=this.scrollLeft;k.scrollLeft=a;l&&(t.scrollLeft=a)});h(f).css(e&&c.bCollapse?"max-height":"height",e);a.nScrollHead=k;a.nScrollBody=f;a.nScrollFoot=t;a.aoDrawCallback.push({fn:ka,sName:"scrolling"});return i[0]}function ka(a){var b=a.oScroll,c=b.sX,d=b.sXInner,e=b.sY,b=b.iBarWidth,f=h(a.nScrollHead),g=f[0].style,j=f.children("div"),i=j[0].style,n=j.children("table"),j=a.nScrollBody,l=h(j),q=j.style,t=h(a.nScrollFoot).children("div"),
m=t.children("table"),o=h(a.nTHead),F=h(a.nTable),p=F[0],r=p.style,u=a.nTFoot?h(a.nTFoot):null,Eb=a.oBrowser,Ua=Eb.bScrollOversize,s=G(a.aoColumns,"nTh"),P,v,w,y,z=[],A=[],B=[],C=[],D,E=function(a){a=a.style;a.paddingTop="0";a.paddingBottom="0";a.borderTopWidth="0";a.borderBottomWidth="0";a.height=0};v=j.scrollHeight>j.clientHeight;if(a.scrollBarVis!==v&&a.scrollBarVis!==k)a.scrollBarVis=v,Y(a);else{a.scrollBarVis=v;F.children("thead, tfoot").remove();u&&(w=u.clone().prependTo(F),P=u.find("tr"),w=
w.find("tr"));y=o.clone().prependTo(F);o=o.find("tr");v=y.find("tr");y.find("th, td").removeAttr("tabindex");c||(q.width="100%",f[0].style.width="100%");h.each(qa(a,y),function(b,c){D=Z(a,b);c.style.width=a.aoColumns[D].sWidth});u&&J(function(a){a.style.width=""},w);f=F.outerWidth();if(""===c){r.width="100%";if(Ua&&(F.find("tbody").height()>j.offsetHeight||"scroll"==l.css("overflow-y")))r.width=x(F.outerWidth()-b);f=F.outerWidth()}else""!==d&&(r.width=x(d),f=F.outerWidth());J(E,v);J(function(a){B.push(a.innerHTML);
z.push(x(h(a).css("width")))},v);J(function(a,b){if(h.inArray(a,s)!==-1)a.style.width=z[b]},o);h(v).height(0);u&&(J(E,w),J(function(a){C.push(a.innerHTML);A.push(x(h(a).css("width")))},w),J(function(a,b){a.style.width=A[b]},P),h(w).height(0));J(function(a,b){a.innerHTML='<div class="dataTables_sizing" style="height:0;overflow:hidden;">'+B[b]+"</div>";a.style.width=z[b]},v);u&&J(function(a,b){a.innerHTML='<div class="dataTables_sizing" style="height:0;overflow:hidden;">'+C[b]+"</div>";a.style.width=
A[b]},w);if(F.outerWidth()<f){P=j.scrollHeight>j.offsetHeight||"scroll"==l.css("overflow-y")?f+b:f;if(Ua&&(j.scrollHeight>j.offsetHeight||"scroll"==l.css("overflow-y")))r.width=x(P-b);(""===c||""!==d)&&L(a,1,"Possible column misalignment",6)}else P="100%";q.width=x(P);g.width=x(P);u&&(a.nScrollFoot.style.width=x(P));!e&&Ua&&(q.height=x(p.offsetHeight+b));c=F.outerWidth();n[0].style.width=x(c);i.width=x(c);d=F.height()>j.clientHeight||"scroll"==l.css("overflow-y");e="padding"+(Eb.bScrollbarLeft?"Left":
"Right");i[e]=d?b+"px":"0px";u&&(m[0].style.width=x(c),t[0].style.width=x(c),t[0].style[e]=d?b+"px":"0px");F.children("colgroup").insertBefore(F.children("thead"));l.scroll();if((a.bSorted||a.bFiltered)&&!a._drawHold)j.scrollTop=0}}function J(a,b,c){for(var d=0,e=0,f=b.length,g,j;e<f;){g=b[e].firstChild;for(j=c?c[e].firstChild:null;g;)1===g.nodeType&&(c?a(g,j,d):a(g,d),d++),g=g.nextSibling,j=c?j.nextSibling:null;e++}}function Fa(a){var b=a.nTable,c=a.aoColumns,d=a.oScroll,e=d.sY,f=d.sX,g=d.sXInner,
j=c.length,i=la(a,"bVisible"),n=h("th",a.nTHead),l=b.getAttribute("width"),k=b.parentNode,t=!1,m,o,p=a.oBrowser,d=p.bScrollOversize;(m=b.style.width)&&-1!==m.indexOf("%")&&(l=m);for(m=0;m<i.length;m++)o=c[i[m]],null!==o.sWidth&&(o.sWidth=Fb(o.sWidthOrig,k),t=!0);if(d||!t&&!f&&!e&&j==aa(a)&&j==n.length)for(m=0;m<j;m++)i=Z(a,m),null!==i&&(c[i].sWidth=x(n.eq(m).width()));else{j=h(b).clone().css("visibility","hidden").removeAttr("id");j.find("tbody tr").remove();var r=h("<tr/>").appendTo(j.find("tbody"));
j.find("thead, tfoot").remove();j.append(h(a.nTHead).clone()).append(h(a.nTFoot).clone());j.find("tfoot th, tfoot td").css("width","");n=qa(a,j.find("thead")[0]);for(m=0;m<i.length;m++)o=c[i[m]],n[m].style.width=null!==o.sWidthOrig&&""!==o.sWidthOrig?x(o.sWidthOrig):"",o.sWidthOrig&&f&&h(n[m]).append(h("<div/>").css({width:o.sWidthOrig,margin:0,padding:0,border:0,height:1}));if(a.aoData.length)for(m=0;m<i.length;m++)t=i[m],o=c[t],h(Gb(a,t)).clone(!1).append(o.sContentPadding).appendTo(r);h("[name]",
j).removeAttr("name");o=h("<div/>").css(f||e?{position:"absolute",top:0,left:0,height:1,right:0,overflow:"hidden"}:{}).append(j).appendTo(k);f&&g?j.width(g):f?(j.css("width","auto"),j.removeAttr("width"),j.width()<k.clientWidth&&l&&j.width(k.clientWidth)):e?j.width(k.clientWidth):l&&j.width(l);for(m=e=0;m<i.length;m++)k=h(n[m]),g=k.outerWidth()-k.width(),k=p.bBounding?Math.ceil(n[m].getBoundingClientRect().width):k.outerWidth(),e+=k,c[i[m]].sWidth=x(k-g);b.style.width=x(e);o.remove()}l&&(b.style.width=
x(l));if((l||f)&&!a._reszEvt)b=function(){h(D).bind("resize.DT-"+a.sInstance,Oa(function(){Y(a)}))},d?setTimeout(b,1E3):b(),a._reszEvt=!0}function Fb(a,b){if(!a)return 0;var c=h("<div/>").css("width",x(a)).appendTo(b||I.body),d=c[0].offsetWidth;c.remove();return d}function Gb(a,b){var c=Hb(a,b);if(0>c)return null;var d=a.aoData[c];return!d.nTr?h("<td/>").html(B(a,c,b,"display"))[0]:d.anCells[b]}function Hb(a,b){for(var c,d=-1,e=-1,f=0,g=a.aoData.length;f<g;f++)c=B(a,f,b,"display")+"",c=c.replace($b,
""),c=c.replace(/&nbsp;/g," "),c.length>d&&(d=c.length,e=f);return e}function x(a){return null===a?"0px":"number"==typeof a?0>a?"0px":a+"px":a.match(/\d$/)?a+"px":a}function V(a){var b,c,d=[],e=a.aoColumns,f,g,j,i;b=a.aaSortingFixed;c=h.isPlainObject(b);var n=[];f=function(a){a.length&&!h.isArray(a[0])?n.push(a):h.merge(n,a)};h.isArray(b)&&f(b);c&&b.pre&&f(b.pre);f(a.aaSorting);c&&b.post&&f(b.post);for(a=0;a<n.length;a++){i=n[a][0];f=e[i].aDataSort;b=0;for(c=f.length;b<c;b++)g=f[b],j=e[g].sType||
"string",n[a]._idx===k&&(n[a]._idx=h.inArray(n[a][1],e[g].asSorting)),d.push({src:i,col:g,dir:n[a][1],index:n[a]._idx,type:j,formatter:m.ext.type.order[j+"-pre"]})}return d}function mb(a){var b,c,d=[],e=m.ext.type.order,f=a.aoData,g=0,j,i=a.aiDisplayMaster,h;Ga(a);h=V(a);b=0;for(c=h.length;b<c;b++)j=h[b],j.formatter&&g++,Ib(a,j.col);if("ssp"!=y(a)&&0!==h.length){b=0;for(c=i.length;b<c;b++)d[i[b]]=b;g===h.length?i.sort(function(a,b){var c,e,g,j,i=h.length,k=f[a]._aSortData,m=f[b]._aSortData;for(g=
0;g<i;g++)if(j=h[g],c=k[j.col],e=m[j.col],c=c<e?-1:c>e?1:0,0!==c)return"asc"===j.dir?c:-c;c=d[a];e=d[b];return c<e?-1:c>e?1:0}):i.sort(function(a,b){var c,g,j,i,k=h.length,m=f[a]._aSortData,p=f[b]._aSortData;for(j=0;j<k;j++)if(i=h[j],c=m[i.col],g=p[i.col],i=e[i.type+"-"+i.dir]||e["string-"+i.dir],c=i(c,g),0!==c)return c;c=d[a];g=d[b];return c<g?-1:c>g?1:0})}a.bSorted=!0}function Jb(a){for(var b,c,d=a.aoColumns,e=V(a),a=a.oLanguage.oAria,f=0,g=d.length;f<g;f++){c=d[f];var j=c.asSorting;b=c.sTitle.replace(/<.*?>/g,
"");var i=c.nTh;i.removeAttribute("aria-sort");c.bSortable&&(0<e.length&&e[0].col==f?(i.setAttribute("aria-sort","asc"==e[0].dir?"ascending":"descending"),c=j[e[0].index+1]||j[0]):c=j[0],b+="asc"===c?a.sSortAscending:a.sSortDescending);i.setAttribute("aria-label",b)}}function Va(a,b,c,d){var e=a.aaSorting,f=a.aoColumns[b].asSorting,g=function(a,b){var c=a._idx;c===k&&(c=h.inArray(a[1],f));return c+1<f.length?c+1:b?null:0};"number"===typeof e[0]&&(e=a.aaSorting=[e]);c&&a.oFeatures.bSortMulti?(c=h.inArray(b,
G(e,"0")),-1!==c?(b=g(e[c],!0),null===b&&1===e.length&&(b=0),null===b?e.splice(c,1):(e[c][1]=f[b],e[c]._idx=b)):(e.push([b,f[0],0]),e[e.length-1]._idx=0)):e.length&&e[0][0]==b?(b=g(e[0]),e.length=1,e[0][1]=f[b],e[0]._idx=b):(e.length=0,e.push([b,f[0]]),e[0]._idx=0);T(a);"function"==typeof d&&d(a)}function Ma(a,b,c,d){var e=a.aoColumns[c];Wa(b,{},function(b){!1!==e.bSortable&&(a.oFeatures.bProcessing?(C(a,!0),setTimeout(function(){Va(a,c,b.shiftKey,d);"ssp"!==y(a)&&C(a,!1)},0)):Va(a,c,b.shiftKey,d))})}
function va(a){var b=a.aLastSort,c=a.oClasses.sSortColumn,d=V(a),e=a.oFeatures,f,g;if(e.bSort&&e.bSortClasses){e=0;for(f=b.length;e<f;e++)g=b[e].src,h(G(a.aoData,"anCells",g)).removeClass(c+(2>e?e+1:3));e=0;for(f=d.length;e<f;e++)g=d[e].src,h(G(a.aoData,"anCells",g)).addClass(c+(2>e?e+1:3))}a.aLastSort=d}function Ib(a,b){var c=a.aoColumns[b],d=m.ext.order[c.sSortDataType],e;d&&(e=d.call(a.oInstance,a,b,$(a,b)));for(var f,g=m.ext.type.order[c.sType+"-pre"],j=0,i=a.aoData.length;j<i;j++)if(c=a.aoData[j],
c._aSortData||(c._aSortData=[]),!c._aSortData[b]||d)f=d?e[j]:B(a,j,b,"sort"),c._aSortData[b]=g?g(f):f}function wa(a){if(a.oFeatures.bStateSave&&!a.bDestroying){var b={time:+new Date,start:a._iDisplayStart,length:a._iDisplayLength,order:h.extend(!0,[],a.aaSorting),search:Ab(a.oPreviousSearch),columns:h.map(a.aoColumns,function(b,d){return{visible:b.bVisible,search:Ab(a.aoPreSearchCols[d])}})};u(a,"aoStateSaveParams","stateSaveParams",[a,b]);a.oSavedState=b;a.fnStateSaveCallback.call(a.oInstance,a,
b)}}function Kb(a){var b,c,d=a.aoColumns;if(a.oFeatures.bStateSave){var e=a.fnStateLoadCallback.call(a.oInstance,a);if(e&&e.time&&(b=u(a,"aoStateLoadParams","stateLoadParams",[a,e]),-1===h.inArray(!1,b)&&(b=a.iStateDuration,!(0<b&&e.time<+new Date-1E3*b)&&d.length===e.columns.length))){a.oLoadedState=h.extend(!0,{},e);e.start!==k&&(a._iDisplayStart=e.start,a.iInitDisplayStart=e.start);e.length!==k&&(a._iDisplayLength=e.length);e.order!==k&&(a.aaSorting=[],h.each(e.order,function(b,c){a.aaSorting.push(c[0]>=
d.length?[0,c[1]]:c)}));e.search!==k&&h.extend(a.oPreviousSearch,Bb(e.search));b=0;for(c=e.columns.length;b<c;b++){var f=e.columns[b];f.visible!==k&&(d[b].bVisible=f.visible);f.search!==k&&h.extend(a.aoPreSearchCols[b],Bb(f.search))}u(a,"aoStateLoaded","stateLoaded",[a,e])}}}function xa(a){var b=m.settings,a=h.inArray(a,G(b,"nTable"));return-1!==a?b[a]:null}function L(a,b,c,d){c="DataTables warning: "+(a?"table id="+a.sTableId+" - ":"")+c;d&&(c+=". For more information about this error, please see http://datatables.net/tn/"+
d);if(b)D.console&&console.log&&console.log(c);else if(b=m.ext,b=b.sErrMode||b.errMode,a&&u(a,null,"error",[a,d,c]),"alert"==b)alert(c);else{if("throw"==b)throw Error(c);"function"==typeof b&&b(a,d,c)}}function E(a,b,c,d){h.isArray(c)?h.each(c,function(c,d){h.isArray(d)?E(a,b,d[0],d[1]):E(a,b,d)}):(d===k&&(d=c),b[c]!==k&&(a[d]=b[c]))}function Lb(a,b,c){var d,e;for(e in b)b.hasOwnProperty(e)&&(d=b[e],h.isPlainObject(d)?(h.isPlainObject(a[e])||(a[e]={}),h.extend(!0,a[e],d)):a[e]=c&&"data"!==e&&"aaData"!==
e&&h.isArray(d)?d.slice():d);return a}function Wa(a,b,c){h(a).bind("click.DT",b,function(b){a.blur();c(b)}).bind("keypress.DT",b,function(a){13===a.which&&(a.preventDefault(),c(a))}).bind("selectstart.DT",function(){return!1})}function z(a,b,c,d){c&&a[b].push({fn:c,sName:d})}function u(a,b,c,d){var e=[];b&&(e=h.map(a[b].slice().reverse(),function(b){return b.fn.apply(a.oInstance,d)}));null!==c&&(b=h.Event(c+".dt"),h(a.nTable).trigger(b,d),e.push(b.result));return e}function Sa(a){var b=a._iDisplayStart,
c=a.fnDisplayEnd(),d=a._iDisplayLength;b>=c&&(b=c-d);b-=b%d;if(-1===d||0>b)b=0;a._iDisplayStart=b}function Na(a,b){var c=a.renderer,d=m.ext.renderer[b];return h.isPlainObject(c)&&c[b]?d[c[b]]||d._:"string"===typeof c?d[c]||d._:d._}function y(a){return a.oFeatures.bServerSide?"ssp":a.ajax||a.sAjaxSource?"ajax":"dom"}function ya(a,b){var c=[],c=Mb.numbers_length,d=Math.floor(c/2);b<=c?c=W(0,b):a<=d?(c=W(0,c-2),c.push("ellipsis"),c.push(b-1)):(a>=b-1-d?c=W(b-(c-2),b):(c=W(a-d+2,a+d-1),c.push("ellipsis"),
c.push(b-1)),c.splice(0,0,"ellipsis"),c.splice(0,0,0));c.DT_el="span";return c}function db(a){h.each({num:function(b){return za(b,a)},"num-fmt":function(b){return za(b,a,Xa)},"html-num":function(b){return za(b,a,Aa)},"html-num-fmt":function(b){return za(b,a,Aa,Xa)}},function(b,c){v.type.order[b+a+"-pre"]=c;b.match(/^html\-/)&&(v.type.search[b+a]=v.type.search.html)})}function Nb(a){return function(){var b=[xa(this[m.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));return m.ext.internal[a].apply(this,
b)}}var m=function(a){this.$=function(a,b){return this.api(!0).$(a,b)};this._=function(a,b){return this.api(!0).rows(a,b).data()};this.api=function(a){return a?new r(xa(this[v.iApiIndex])):new r(this)};this.fnAddData=function(a,b){var c=this.api(!0),d=h.isArray(a)&&(h.isArray(a[0])||h.isPlainObject(a[0]))?c.rows.add(a):c.row.add(a);(b===k||b)&&c.draw();return d.flatten().toArray()};this.fnAdjustColumnSizing=function(a){var b=this.api(!0).columns.adjust(),c=b.settings()[0],d=c.oScroll;a===k||a?b.draw(!1):
(""!==d.sX||""!==d.sY)&&ka(c)};this.fnClearTable=function(a){var b=this.api(!0).clear();(a===k||a)&&b.draw()};this.fnClose=function(a){this.api(!0).row(a).child.hide()};this.fnDeleteRow=function(a,b,c){var d=this.api(!0),a=d.rows(a),e=a.settings()[0],h=e.aoData[a[0][0]];a.remove();b&&b.call(this,e,h);(c===k||c)&&d.draw();return h};this.fnDestroy=function(a){this.api(!0).destroy(a)};this.fnDraw=function(a){this.api(!0).draw(a)};this.fnFilter=function(a,b,c,d,e,h){e=this.api(!0);null===b||b===k?e.search(a,
c,d,h):e.column(b).search(a,c,d,h);e.draw()};this.fnGetData=function(a,b){var c=this.api(!0);if(a!==k){var d=a.nodeName?a.nodeName.toLowerCase():"";return b!==k||"td"==d||"th"==d?c.cell(a,b).data():c.row(a).data()||null}return c.data().toArray()};this.fnGetNodes=function(a){var b=this.api(!0);return a!==k?b.row(a).node():b.rows().nodes().flatten().toArray()};this.fnGetPosition=function(a){var b=this.api(!0),c=a.nodeName.toUpperCase();return"TR"==c?b.row(a).index():"TD"==c||"TH"==c?(a=b.cell(a).index(),
[a.row,a.columnVisible,a.column]):null};this.fnIsOpen=function(a){return this.api(!0).row(a).child.isShown()};this.fnOpen=function(a,b,c){return this.api(!0).row(a).child(b,c).show().child()[0]};this.fnPageChange=function(a,b){var c=this.api(!0).page(a);(b===k||b)&&c.draw(!1)};this.fnSetColumnVis=function(a,b,c){a=this.api(!0).column(a).visible(b);(c===k||c)&&a.columns.adjust().draw()};this.fnSettings=function(){return xa(this[v.iApiIndex])};this.fnSort=function(a){this.api(!0).order(a).draw()};this.fnSortListener=
function(a,b,c){this.api(!0).order.listener(a,b,c)};this.fnUpdate=function(a,b,c,d,e){var h=this.api(!0);c===k||null===c?h.row(b).data(a):h.cell(b,c).data(a);(e===k||e)&&h.columns.adjust();(d===k||d)&&h.draw();return 0};this.fnVersionCheck=v.fnVersionCheck;var b=this,c=a===k,d=this.length;c&&(a={});this.oApi=this.internal=v.internal;for(var e in m.ext.internal)e&&(this[e]=Nb(e));this.each(function(){var e={},e=1<d?Lb(e,a,!0):a,g=0,j,i=this.getAttribute("id"),n=!1,l=m.defaults,q=h(this);if("table"!=
this.nodeName.toLowerCase())L(null,0,"Non-table node initialisation ("+this.nodeName+")",2);else{eb(l);fb(l.column);K(l,l,!0);K(l.column,l.column,!0);K(l,h.extend(e,q.data()));var t=m.settings,g=0;for(j=t.length;g<j;g++){var p=t[g];if(p.nTable==this||p.nTHead.parentNode==this||p.nTFoot&&p.nTFoot.parentNode==this){g=e.bRetrieve!==k?e.bRetrieve:l.bRetrieve;if(c||g)return p.oInstance;if(e.bDestroy!==k?e.bDestroy:l.bDestroy){p.oInstance.fnDestroy();break}else{L(p,0,"Cannot reinitialise DataTable",3);
return}}if(p.sTableId==this.id){t.splice(g,1);break}}if(null===i||""===i)this.id=i="DataTables_Table_"+m.ext._unique++;var o=h.extend(!0,{},m.models.oSettings,{sDestroyWidth:q[0].style.width,sInstance:i,sTableId:i});o.nTable=this;o.oApi=b.internal;o.oInit=e;t.push(o);o.oInstance=1===b.length?b:q.dataTable();eb(e);e.oLanguage&&Da(e.oLanguage);e.aLengthMenu&&!e.iDisplayLength&&(e.iDisplayLength=h.isArray(e.aLengthMenu[0])?e.aLengthMenu[0][0]:e.aLengthMenu[0]);e=Lb(h.extend(!0,{},l),e);E(o.oFeatures,
e,"bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" "));E(o,e,["asStripeClasses","ajax","fnServerData","fnFormatNumber","sServerMethod","aaSorting","aaSortingFixed","aLengthMenu","sPaginationType","sAjaxSource","sAjaxDataProp","iStateDuration","sDom","bSortCellsTop","iTabIndex","fnStateLoadCallback","fnStateSaveCallback","renderer","searchDelay","rowId",["iCookieDuration","iStateDuration"],["oSearch","oPreviousSearch"],["aoSearchCols",
"aoPreSearchCols"],["iDisplayLength","_iDisplayLength"],["bJQueryUI","bJUI"]]);E(o.oScroll,e,[["sScrollX","sX"],["sScrollXInner","sXInner"],["sScrollY","sY"],["bScrollCollapse","bCollapse"]]);E(o.oLanguage,e,"fnInfoCallback");z(o,"aoDrawCallback",e.fnDrawCallback,"user");z(o,"aoServerParams",e.fnServerParams,"user");z(o,"aoStateSaveParams",e.fnStateSaveParams,"user");z(o,"aoStateLoadParams",e.fnStateLoadParams,"user");z(o,"aoStateLoaded",e.fnStateLoaded,"user");z(o,"aoRowCallback",e.fnRowCallback,
"user");z(o,"aoRowCreatedCallback",e.fnCreatedRow,"user");z(o,"aoHeaderCallback",e.fnHeaderCallback,"user");z(o,"aoFooterCallback",e.fnFooterCallback,"user");z(o,"aoInitComplete",e.fnInitComplete,"user");z(o,"aoPreDrawCallback",e.fnPreDrawCallback,"user");o.rowIdFn=Q(e.rowId);gb(o);i=o.oClasses;e.bJQueryUI?(h.extend(i,m.ext.oJUIClasses,e.oClasses),e.sDom===l.sDom&&"lfrtip"===l.sDom&&(o.sDom='<"H"lfr>t<"F"ip>'),o.renderer)?h.isPlainObject(o.renderer)&&!o.renderer.header&&(o.renderer.header="jqueryui"):
o.renderer="jqueryui":h.extend(i,m.ext.classes,e.oClasses);q.addClass(i.sTable);o.iInitDisplayStart===k&&(o.iInitDisplayStart=e.iDisplayStart,o._iDisplayStart=e.iDisplayStart);null!==e.iDeferLoading&&(o.bDeferLoading=!0,g=h.isArray(e.iDeferLoading),o._iRecordsDisplay=g?e.iDeferLoading[0]:e.iDeferLoading,o._iRecordsTotal=g?e.iDeferLoading[1]:e.iDeferLoading);var r=o.oLanguage;h.extend(!0,r,e.oLanguage);""!==r.sUrl&&(h.ajax({dataType:"json",url:r.sUrl,success:function(a){Da(a);K(l.oLanguage,a);h.extend(true,
r,a);ga(o)},error:function(){ga(o)}}),n=!0);null===e.asStripeClasses&&(o.asStripeClasses=[i.sStripeOdd,i.sStripeEven]);var g=o.asStripeClasses,v=q.children("tbody").find("tr").eq(0);-1!==h.inArray(!0,h.map(g,function(a){return v.hasClass(a)}))&&(h("tbody tr",this).removeClass(g.join(" ")),o.asDestroyStripes=g.slice());t=[];g=this.getElementsByTagName("thead");0!==g.length&&(da(o.aoHeader,g[0]),t=qa(o));if(null===e.aoColumns){p=[];g=0;for(j=t.length;g<j;g++)p.push(null)}else p=e.aoColumns;g=0;for(j=
p.length;g<j;g++)Ea(o,t?t[g]:null);ib(o,e.aoColumnDefs,p,function(a,b){ja(o,a,b)});if(v.length){var s=function(a,b){return a.getAttribute("data-"+b)!==null?b:null};h(v[0]).children("th, td").each(function(a,b){var c=o.aoColumns[a];if(c.mData===a){var d=s(b,"sort")||s(b,"order"),e=s(b,"filter")||s(b,"search");if(d!==null||e!==null){c.mData={_:a+".display",sort:d!==null?a+".@data-"+d:k,type:d!==null?a+".@data-"+d:k,filter:e!==null?a+".@data-"+e:k};ja(o,a)}}})}var w=o.oFeatures;e.bStateSave&&(w.bStateSave=
!0,Kb(o,e),z(o,"aoDrawCallback",wa,"state_save"));if(e.aaSorting===k){t=o.aaSorting;g=0;for(j=t.length;g<j;g++)t[g][1]=o.aoColumns[g].asSorting[0]}va(o);w.bSort&&z(o,"aoDrawCallback",function(){if(o.bSorted){var a=V(o),b={};h.each(a,function(a,c){b[c.src]=c.dir});u(o,null,"order",[o,a,b]);Jb(o)}});z(o,"aoDrawCallback",function(){(o.bSorted||y(o)==="ssp"||w.bDeferRender)&&va(o)},"sc");g=q.children("caption").each(function(){this._captionSide=q.css("caption-side")});j=q.children("thead");0===j.length&&
(j=h("<thead/>").appendTo(this));o.nTHead=j[0];j=q.children("tbody");0===j.length&&(j=h("<tbody/>").appendTo(this));o.nTBody=j[0];j=q.children("tfoot");if(0===j.length&&0<g.length&&(""!==o.oScroll.sX||""!==o.oScroll.sY))j=h("<tfoot/>").appendTo(this);0===j.length||0===j.children().length?q.addClass(i.sNoFooter):0<j.length&&(o.nTFoot=j[0],da(o.aoFooter,o.nTFoot));if(e.aaData)for(g=0;g<e.aaData.length;g++)N(o,e.aaData[g]);else(o.bDeferLoading||"dom"==y(o))&&ma(o,h(o.nTBody).children("tr"));o.aiDisplay=
o.aiDisplayMaster.slice();o.bInitialised=!0;!1===n&&ga(o)}});b=null;return this},v,r,p,s,Ya={},Ob=/[\r\n]/g,Aa=/<.*?>/g,ac=/^[\w\+\-]/,bc=/[\w\+\-]$/,cc=RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)","g"),Xa=/[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfk]/gi,M=function(a){return!a||!0===a||"-"===a?!0:!1},Pb=function(a){var b=parseInt(a,10);return!isNaN(b)&&isFinite(a)?b:null},Qb=function(a,b){Ya[b]||(Ya[b]=RegExp(Qa(b),"g"));return"string"===typeof a&&"."!==b?a.replace(/\./g,
"").replace(Ya[b],"."):a},Za=function(a,b,c){var d="string"===typeof a;if(M(a))return!0;b&&d&&(a=Qb(a,b));c&&d&&(a=a.replace(Xa,""));return!isNaN(parseFloat(a))&&isFinite(a)},Rb=function(a,b,c){return M(a)?!0:!(M(a)||"string"===typeof a)?null:Za(a.replace(Aa,""),b,c)?!0:null},G=function(a,b,c){var d=[],e=0,f=a.length;if(c!==k)for(;e<f;e++)a[e]&&a[e][b]&&d.push(a[e][b][c]);else for(;e<f;e++)a[e]&&d.push(a[e][b]);return d},ha=function(a,b,c,d){var e=[],f=0,g=b.length;if(d!==k)for(;f<g;f++)a[b[f]][c]&&
e.push(a[b[f]][c][d]);else for(;f<g;f++)e.push(a[b[f]][c]);return e},W=function(a,b){var c=[],d;b===k?(b=0,d=a):(d=b,b=a);for(var e=b;e<d;e++)c.push(e);return c},Sb=function(a){for(var b=[],c=0,d=a.length;c<d;c++)a[c]&&b.push(a[c]);return b},pa=function(a){var b=[],c,d,e=a.length,f,g=0;d=0;a:for(;d<e;d++){c=a[d];for(f=0;f<g;f++)if(b[f]===c)continue a;b.push(c);g++}return b};m.util={throttle:function(a,b){var c=b!==k?b:200,d,e;return function(){var b=this,g=+new Date,h=arguments;d&&g<d+c?(clearTimeout(e),
e=setTimeout(function(){d=k;a.apply(b,h)},c)):(d=g,a.apply(b,h))}},escapeRegex:function(a){return a.replace(cc,"\\$1")}};var A=function(a,b,c){a[b]!==k&&(a[c]=a[b])},ba=/\[.*?\]$/,U=/\(\)$/,Qa=m.util.escapeRegex,ua=h("<div>")[0],Zb=ua.textContent!==k,$b=/<.*?>/g,Oa=m.util.throttle,Tb=[],w=Array.prototype,dc=function(a){var b,c,d=m.settings,e=h.map(d,function(a){return a.nTable});if(a){if(a.nTable&&a.oApi)return[a];if(a.nodeName&&"table"===a.nodeName.toLowerCase())return b=h.inArray(a,e),-1!==b?[d[b]]:
null;if(a&&"function"===typeof a.settings)return a.settings().toArray();"string"===typeof a?c=h(a):a instanceof h&&(c=a)}else return[];if(c)return c.map(function(){b=h.inArray(this,e);return-1!==b?d[b]:null}).toArray()};r=function(a,b){if(!(this instanceof r))return new r(a,b);var c=[],d=function(a){(a=dc(a))&&(c=c.concat(a))};if(h.isArray(a))for(var e=0,f=a.length;e<f;e++)d(a[e]);else d(a);this.context=pa(c);b&&h.merge(this,b);this.selector={rows:null,cols:null,opts:null};r.extend(this,this,Tb)};
m.Api=r;h.extend(r.prototype,{any:function(){return 0!==this.count()},concat:w.concat,context:[],count:function(){return this.flatten().length},each:function(a){for(var b=0,c=this.length;b<c;b++)a.call(this,this[b],b,this);return this},eq:function(a){var b=this.context;return b.length>a?new r(b[a],this[a]):null},filter:function(a){var b=[];if(w.filter)b=w.filter.call(this,a,this);else for(var c=0,d=this.length;c<d;c++)a.call(this,this[c],c,this)&&b.push(this[c]);return new r(this.context,b)},flatten:function(){var a=
[];return new r(this.context,a.concat.apply(a,this.toArray()))},join:w.join,indexOf:w.indexOf||function(a,b){for(var c=b||0,d=this.length;c<d;c++)if(this[c]===a)return c;return-1},iterator:function(a,b,c,d){var e=[],f,g,h,i,n,l=this.context,m,t,p=this.selector;"string"===typeof a&&(d=c,c=b,b=a,a=!1);g=0;for(h=l.length;g<h;g++){var o=new r(l[g]);if("table"===b)f=c.call(o,l[g],g),f!==k&&e.push(f);else if("columns"===b||"rows"===b)f=c.call(o,l[g],this[g],g),f!==k&&e.push(f);else if("column"===b||"column-rows"===
b||"row"===b||"cell"===b){t=this[g];"column-rows"===b&&(m=Ba(l[g],p.opts));i=0;for(n=t.length;i<n;i++)f=t[i],f="cell"===b?c.call(o,l[g],f.row,f.column,g,i):c.call(o,l[g],f,g,i,m),f!==k&&e.push(f)}}return e.length||d?(a=new r(l,a?e.concat.apply([],e):e),b=a.selector,b.rows=p.rows,b.cols=p.cols,b.opts=p.opts,a):this},lastIndexOf:w.lastIndexOf||function(a,b){return this.indexOf.apply(this.toArray.reverse(),arguments)},length:0,map:function(a){var b=[];if(w.map)b=w.map.call(this,a,this);else for(var c=
0,d=this.length;c<d;c++)b.push(a.call(this,this[c],c));return new r(this.context,b)},pluck:function(a){return this.map(function(b){return b[a]})},pop:w.pop,push:w.push,reduce:w.reduce||function(a,b){return hb(this,a,b,0,this.length,1)},reduceRight:w.reduceRight||function(a,b){return hb(this,a,b,this.length-1,-1,-1)},reverse:w.reverse,selector:null,shift:w.shift,sort:w.sort,splice:w.splice,toArray:function(){return w.slice.call(this)},to$:function(){return h(this)},toJQuery:function(){return h(this)},
unique:function(){return new r(this.context,pa(this))},unshift:w.unshift});r.extend=function(a,b,c){if(c.length&&b&&(b instanceof r||b.__dt_wrapper)){var d,e,f,g=function(a,b,c){return function(){var d=b.apply(a,arguments);r.extend(d,d,c.methodExt);return d}};d=0;for(e=c.length;d<e;d++)f=c[d],b[f.name]="function"===typeof f.val?g(a,f.val,f):h.isPlainObject(f.val)?{}:f.val,b[f.name].__dt_wrapper=!0,r.extend(a,b[f.name],f.propExt)}};r.register=p=function(a,b){if(h.isArray(a))for(var c=0,d=a.length;c<
d;c++)r.register(a[c],b);else for(var e=a.split("."),f=Tb,g,j,c=0,d=e.length;c<d;c++){g=(j=-1!==e[c].indexOf("()"))?e[c].replace("()",""):e[c];var i;a:{i=0;for(var n=f.length;i<n;i++)if(f[i].name===g){i=f[i];break a}i=null}i||(i={name:g,val:{},methodExt:[],propExt:[]},f.push(i));c===d-1?i.val=b:f=j?i.methodExt:i.propExt}};r.registerPlural=s=function(a,b,c){r.register(a,c);r.register(b,function(){var a=c.apply(this,arguments);return a===this?this:a instanceof r?a.length?h.isArray(a[0])?new r(a.context,
a[0]):a[0]:k:a})};p("tables()",function(a){var b;if(a){b=r;var c=this.context;if("number"===typeof a)a=[c[a]];else var d=h.map(c,function(a){return a.nTable}),a=h(d).filter(a).map(function(){var a=h.inArray(this,d);return c[a]}).toArray();b=new b(a)}else b=this;return b});p("table()",function(a){var a=this.tables(a),b=a.context;return b.length?new r(b[0]):a});s("tables().nodes()","table().node()",function(){return this.iterator("table",function(a){return a.nTable},1)});s("tables().body()","table().body()",
function(){return this.iterator("table",function(a){return a.nTBody},1)});s("tables().header()","table().header()",function(){return this.iterator("table",function(a){return a.nTHead},1)});s("tables().footer()","table().footer()",function(){return this.iterator("table",function(a){return a.nTFoot},1)});s("tables().containers()","table().container()",function(){return this.iterator("table",function(a){return a.nTableWrapper},1)});p("draw()",function(a){return this.iterator("table",function(b){"page"===
a?O(b):("string"===typeof a&&(a="full-hold"===a?!1:!0),T(b,!1===a))})});p("page()",function(a){return a===k?this.page.info().page:this.iterator("table",function(b){Ta(b,a)})});p("page.info()",function(){if(0===this.context.length)return k;var a=this.context[0],b=a._iDisplayStart,c=a.oFeatures.bPaginate?a._iDisplayLength:-1,d=a.fnRecordsDisplay(),e=-1===c;return{page:e?0:Math.floor(b/c),pages:e?1:Math.ceil(d/c),start:b,end:a.fnDisplayEnd(),length:c,recordsTotal:a.fnRecordsTotal(),recordsDisplay:d,
serverSide:"ssp"===y(a)}});p("page.len()",function(a){return a===k?0!==this.context.length?this.context[0]._iDisplayLength:k:this.iterator("table",function(b){Ra(b,a)})});var Ub=function(a,b,c){if(c){var d=new r(a);d.one("draw",function(){c(d.ajax.json())})}if("ssp"==y(a))T(a,b);else{C(a,!0);var e=a.jqXHR;e&&4!==e.readyState&&e.abort();ra(a,[],function(c){na(a);for(var c=sa(a,c),d=0,e=c.length;d<e;d++)N(a,c[d]);T(a,b);C(a,!1)})}};p("ajax.json()",function(){var a=this.context;if(0<a.length)return a[0].json});
p("ajax.params()",function(){var a=this.context;if(0<a.length)return a[0].oAjaxData});p("ajax.reload()",function(a,b){return this.iterator("table",function(c){Ub(c,!1===b,a)})});p("ajax.url()",function(a){var b=this.context;if(a===k){if(0===b.length)return k;b=b[0];return b.ajax?h.isPlainObject(b.ajax)?b.ajax.url:b.ajax:b.sAjaxSource}return this.iterator("table",function(b){h.isPlainObject(b.ajax)?b.ajax.url=a:b.ajax=a})});p("ajax.url().load()",function(a,b){return this.iterator("table",function(c){Ub(c,
!1===b,a)})});var $a=function(a,b,c,d,e){var f=[],g,j,i,n,l,m;i=typeof b;if(!b||"string"===i||"function"===i||b.length===k)b=[b];i=0;for(n=b.length;i<n;i++){j=b[i]&&b[i].split?b[i].split(","):[b[i]];l=0;for(m=j.length;l<m;l++)(g=c("string"===typeof j[l]?h.trim(j[l]):j[l]))&&g.length&&(f=f.concat(g))}a=v.selector[a];if(a.length){i=0;for(n=a.length;i<n;i++)f=a[i](d,e,f)}return pa(f)},ab=function(a){a||(a={});a.filter&&a.search===k&&(a.search=a.filter);return h.extend({search:"none",order:"current",
page:"all"},a)},bb=function(a){for(var b=0,c=a.length;b<c;b++)if(0<a[b].length)return a[0]=a[b],a[0].length=1,a.length=1,a.context=[a.context[b]],a;a.length=0;return a},Ba=function(a,b){var c,d,e,f=[],g=a.aiDisplay;c=a.aiDisplayMaster;var j=b.search;d=b.order;e=b.page;if("ssp"==y(a))return"removed"===j?[]:W(0,c.length);if("current"==e){c=a._iDisplayStart;for(d=a.fnDisplayEnd();c<d;c++)f.push(g[c])}else if("current"==d||"applied"==d)f="none"==j?c.slice():"applied"==j?g.slice():h.map(c,function(a){return-1===
h.inArray(a,g)?a:null});else if("index"==d||"original"==d){c=0;for(d=a.aoData.length;c<d;c++)"none"==j?f.push(c):(e=h.inArray(c,g),(-1===e&&"removed"==j||0<=e&&"applied"==j)&&f.push(c))}return f};p("rows()",function(a,b){a===k?a="":h.isPlainObject(a)&&(b=a,a="");var b=ab(b),c=this.iterator("table",function(c){var e=b;return $a("row",a,function(a){var b=Pb(a);if(b!==null&&!e)return[b];var j=Ba(c,e);if(b!==null&&h.inArray(b,j)!==-1)return[b];if(!a)return j;if(typeof a==="function")return h.map(j,function(b){var e=
c.aoData[b];return a(b,e._aData,e.nTr)?b:null});b=Sb(ha(c.aoData,j,"nTr"));if(a.nodeName){if(a._DT_RowIndex!==k)return[a._DT_RowIndex];if(a._DT_CellIndex)return[a._DT_CellIndex.row];b=h(a).closest("*[data-dt-row]");return b.length?[b.data("dt-row")]:[]}if(typeof a==="string"&&a.charAt(0)==="#"){j=c.aIds[a.replace(/^#/,"")];if(j!==k)return[j.idx]}return h(b).filter(a).map(function(){return this._DT_RowIndex}).toArray()},c,e)},1);c.selector.rows=a;c.selector.opts=b;return c});p("rows().nodes()",function(){return this.iterator("row",
function(a,b){return a.aoData[b].nTr||k},1)});p("rows().data()",function(){return this.iterator(!0,"rows",function(a,b){return ha(a.aoData,b,"_aData")},1)});s("rows().cache()","row().cache()",function(a){return this.iterator("row",function(b,c){var d=b.aoData[c];return"search"===a?d._aFilterData:d._aSortData},1)});s("rows().invalidate()","row().invalidate()",function(a){return this.iterator("row",function(b,c){ca(b,c,a)})});s("rows().indexes()","row().index()",function(){return this.iterator("row",
function(a,b){return b},1)});s("rows().ids()","row().id()",function(a){for(var b=[],c=this.context,d=0,e=c.length;d<e;d++)for(var f=0,g=this[d].length;f<g;f++){var h=c[d].rowIdFn(c[d].aoData[this[d][f]]._aData);b.push((!0===a?"#":"")+h)}return new r(c,b)});s("rows().remove()","row().remove()",function(){var a=this;this.iterator("row",function(b,c,d){var e=b.aoData,f=e[c],g,h,i,n,l;e.splice(c,1);g=0;for(h=e.length;g<h;g++)if(i=e[g],l=i.anCells,null!==i.nTr&&(i.nTr._DT_RowIndex=g),null!==l){i=0;for(n=
l.length;i<n;i++)l[i]._DT_CellIndex.row=g}oa(b.aiDisplayMaster,c);oa(b.aiDisplay,c);oa(a[d],c,!1);Sa(b);c=b.rowIdFn(f._aData);c!==k&&delete b.aIds[c]});this.iterator("table",function(a){for(var c=0,d=a.aoData.length;c<d;c++)a.aoData[c].idx=c});return this});p("rows.add()",function(a){var b=this.iterator("table",function(b){var c,f,g,h=[];f=0;for(g=a.length;f<g;f++)c=a[f],c.nodeName&&"TR"===c.nodeName.toUpperCase()?h.push(ma(b,c)[0]):h.push(N(b,c));return h},1),c=this.rows(-1);c.pop();h.merge(c,b);
return c});p("row()",function(a,b){return bb(this.rows(a,b))});p("row().data()",function(a){var b=this.context;if(a===k)return b.length&&this.length?b[0].aoData[this[0]]._aData:k;b[0].aoData[this[0]]._aData=a;ca(b[0],this[0],"data");return this});p("row().node()",function(){var a=this.context;return a.length&&this.length?a[0].aoData[this[0]].nTr||null:null});p("row.add()",function(a){a instanceof h&&a.length&&(a=a[0]);var b=this.iterator("table",function(b){return a.nodeName&&"TR"===a.nodeName.toUpperCase()?
ma(b,a)[0]:N(b,a)});return this.row(b[0])});var cb=function(a,b){var c=a.context;if(c.length&&(c=c[0].aoData[b!==k?b:a[0]])&&c._details)c._details.remove(),c._detailsShow=k,c._details=k},Vb=function(a,b){var c=a.context;if(c.length&&a.length){var d=c[0].aoData[a[0]];if(d._details){(d._detailsShow=b)?d._details.insertAfter(d.nTr):d._details.detach();var e=c[0],f=new r(e),g=e.aoData;f.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details");0<G(g,"_details").length&&(f.on("draw.dt.DT_details",
function(a,b){e===b&&f.rows({page:"current"}).eq(0).each(function(a){a=g[a];a._detailsShow&&a._details.insertAfter(a.nTr)})}),f.on("column-visibility.dt.DT_details",function(a,b){if(e===b)for(var c,d=aa(b),f=0,h=g.length;f<h;f++)c=g[f],c._details&&c._details.children("td[colspan]").attr("colspan",d)}),f.on("destroy.dt.DT_details",function(a,b){if(e===b)for(var c=0,d=g.length;c<d;c++)g[c]._details&&cb(f,c)}))}}};p("row().child()",function(a,b){var c=this.context;if(a===k)return c.length&&this.length?
c[0].aoData[this[0]]._details:k;if(!0===a)this.child.show();else if(!1===a)cb(this);else if(c.length&&this.length){var d=c[0],c=c[0].aoData[this[0]],e=[],f=function(a,b){if(h.isArray(a)||a instanceof h)for(var c=0,k=a.length;c<k;c++)f(a[c],b);else a.nodeName&&"tr"===a.nodeName.toLowerCase()?e.push(a):(c=h("<tr><td/></tr>").addClass(b),h("td",c).addClass(b).html(a)[0].colSpan=aa(d),e.push(c[0]))};f(a,b);c._details&&c._details.remove();c._details=h(e);c._detailsShow&&c._details.insertAfter(c.nTr)}return this});
p(["row().child.show()","row().child().show()"],function(){Vb(this,!0);return this});p(["row().child.hide()","row().child().hide()"],function(){Vb(this,!1);return this});p(["row().child.remove()","row().child().remove()"],function(){cb(this);return this});p("row().child.isShown()",function(){var a=this.context;return a.length&&this.length?a[0].aoData[this[0]]._detailsShow||!1:!1});var ec=/^(.+):(name|visIdx|visible)$/,Wb=function(a,b,c,d,e){for(var c=[],d=0,f=e.length;d<f;d++)c.push(B(a,e[d],b));
return c};p("columns()",function(a,b){a===k?a="":h.isPlainObject(a)&&(b=a,a="");var b=ab(b),c=this.iterator("table",function(c){var e=a,f=b,g=c.aoColumns,j=G(g,"sName"),i=G(g,"nTh");return $a("column",e,function(a){var b=Pb(a);if(a==="")return W(g.length);if(b!==null)return[b>=0?b:g.length+b];if(typeof a==="function"){var e=Ba(c,f);return h.map(g,function(b,f){return a(f,Wb(c,f,0,0,e),i[f])?f:null})}var k=typeof a==="string"?a.match(ec):"";if(k)switch(k[2]){case "visIdx":case "visible":b=parseInt(k[1],
10);if(b<0){var m=h.map(g,function(a,b){return a.bVisible?b:null});return[m[m.length+b]]}return[Z(c,b)];case "name":return h.map(j,function(a,b){return a===k[1]?b:null});default:return[]}if(a.nodeName&&a._DT_CellIndex)return[a._DT_CellIndex.column];b=h(i).filter(a).map(function(){return h.inArray(this,i)}).toArray();if(b.length||!a.nodeName)return b;b=h(a).closest("*[data-dt-column]");return b.length?[b.data("dt-column")]:[]},c,f)},1);c.selector.cols=a;c.selector.opts=b;return c});s("columns().header()",
"column().header()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].nTh},1)});s("columns().footer()","column().footer()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].nTf},1)});s("columns().data()","column().data()",function(){return this.iterator("column-rows",Wb,1)});s("columns().dataSrc()","column().dataSrc()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].mData},1)});s("columns().cache()","column().cache()",
function(a){return this.iterator("column-rows",function(b,c,d,e,f){return ha(b.aoData,f,"search"===a?"_aFilterData":"_aSortData",c)},1)});s("columns().nodes()","column().nodes()",function(){return this.iterator("column-rows",function(a,b,c,d,e){return ha(a.aoData,e,"anCells",b)},1)});s("columns().visible()","column().visible()",function(a,b){var c=this.iterator("column",function(b,c){if(a===k)return b.aoColumns[c].bVisible;var f=b.aoColumns,g=f[c],j=b.aoData,i,n,l;if(a!==k&&g.bVisible!==a){if(a){var m=
h.inArray(!0,G(f,"bVisible"),c+1);i=0;for(n=j.length;i<n;i++)l=j[i].nTr,f=j[i].anCells,l&&l.insertBefore(f[c],f[m]||null)}else h(G(b.aoData,"anCells",c)).detach();g.bVisible=a;ea(b,b.aoHeader);ea(b,b.aoFooter);wa(b)}});a!==k&&(this.iterator("column",function(c,e){u(c,null,"column-visibility",[c,e,a,b])}),(b===k||b)&&this.columns.adjust());return c});s("columns().indexes()","column().index()",function(a){return this.iterator("column",function(b,c){return"visible"===a?$(b,c):c},1)});p("columns.adjust()",
function(){return this.iterator("table",function(a){Y(a)},1)});p("column.index()",function(a,b){if(0!==this.context.length){var c=this.context[0];if("fromVisible"===a||"toData"===a)return Z(c,b);if("fromData"===a||"toVisible"===a)return $(c,b)}});p("column()",function(a,b){return bb(this.columns(a,b))});p("cells()",function(a,b,c){h.isPlainObject(a)&&(a.row===k?(c=a,a=null):(c=b,b=null));h.isPlainObject(b)&&(c=b,b=null);if(null===b||b===k)return this.iterator("table",function(b){var d=a,e=ab(c),f=
b.aoData,g=Ba(b,e),j=Sb(ha(f,g,"anCells")),i=h([].concat.apply([],j)),l,n=b.aoColumns.length,m,p,r,u,v,s;return $a("cell",d,function(a){var c=typeof a==="function";if(a===null||a===k||c){m=[];p=0;for(r=g.length;p<r;p++){l=g[p];for(u=0;u<n;u++){v={row:l,column:u};if(c){s=f[l];a(v,B(b,l,u),s.anCells?s.anCells[u]:null)&&m.push(v)}else m.push(v)}}return m}if(h.isPlainObject(a))return[a];c=i.filter(a).map(function(a,b){return{row:b._DT_CellIndex.row,column:b._DT_CellIndex.column}}).toArray();if(c.length||
!a.nodeName)return c;s=h(a).closest("*[data-dt-row]");return s.length?[{row:s.data("dt-row"),column:s.data("dt-column")}]:[]},b,e)});var d=this.columns(b,c),e=this.rows(a,c),f,g,j,i,n,l=this.iterator("table",function(a,b){f=[];g=0;for(j=e[b].length;g<j;g++){i=0;for(n=d[b].length;i<n;i++)f.push({row:e[b][g],column:d[b][i]})}return f},1);h.extend(l.selector,{cols:b,rows:a,opts:c});return l});s("cells().nodes()","cell().node()",function(){return this.iterator("cell",function(a,b,c){return(a=a.aoData[b])&&
a.anCells?a.anCells[c]:k},1)});p("cells().data()",function(){return this.iterator("cell",function(a,b,c){return B(a,b,c)},1)});s("cells().cache()","cell().cache()",function(a){a="search"===a?"_aFilterData":"_aSortData";return this.iterator("cell",function(b,c,d){return b.aoData[c][a][d]},1)});s("cells().render()","cell().render()",function(a){return this.iterator("cell",function(b,c,d){return B(b,c,d,a)},1)});s("cells().indexes()","cell().index()",function(){return this.iterator("cell",function(a,
b,c){return{row:b,column:c,columnVisible:$(a,c)}},1)});s("cells().invalidate()","cell().invalidate()",function(a){return this.iterator("cell",function(b,c,d){ca(b,c,a,d)})});p("cell()",function(a,b,c){return bb(this.cells(a,b,c))});p("cell().data()",function(a){var b=this.context,c=this[0];if(a===k)return b.length&&c.length?B(b[0],c[0].row,c[0].column):k;jb(b[0],c[0].row,c[0].column,a);ca(b[0],c[0].row,"data",c[0].column);return this});p("order()",function(a,b){var c=this.context;if(a===k)return 0!==
c.length?c[0].aaSorting:k;"number"===typeof a?a=[[a,b]]:a.length&&!h.isArray(a[0])&&(a=Array.prototype.slice.call(arguments));return this.iterator("table",function(b){b.aaSorting=a.slice()})});p("order.listener()",function(a,b,c){return this.iterator("table",function(d){Ma(d,a,b,c)})});p("order.fixed()",function(a){if(!a){var b=this.context,b=b.length?b[0].aaSortingFixed:k;return h.isArray(b)?{pre:b}:b}return this.iterator("table",function(b){b.aaSortingFixed=h.extend(!0,{},a)})});p(["columns().order()",
"column().order()"],function(a){var b=this;return this.iterator("table",function(c,d){var e=[];h.each(b[d],function(b,c){e.push([c,a])});c.aaSorting=e})});p("search()",function(a,b,c,d){var e=this.context;return a===k?0!==e.length?e[0].oPreviousSearch.sSearch:k:this.iterator("table",function(e){e.oFeatures.bFilter&&fa(e,h.extend({},e.oPreviousSearch,{sSearch:a+"",bRegex:null===b?!1:b,bSmart:null===c?!0:c,bCaseInsensitive:null===d?!0:d}),1)})});s("columns().search()","column().search()",function(a,
b,c,d){return this.iterator("column",function(e,f){var g=e.aoPreSearchCols;if(a===k)return g[f].sSearch;e.oFeatures.bFilter&&(h.extend(g[f],{sSearch:a+"",bRegex:null===b?!1:b,bSmart:null===c?!0:c,bCaseInsensitive:null===d?!0:d}),fa(e,e.oPreviousSearch,1))})});p("state()",function(){return this.context.length?this.context[0].oSavedState:null});p("state.clear()",function(){return this.iterator("table",function(a){a.fnStateSaveCallback.call(a.oInstance,a,{})})});p("state.loaded()",function(){return this.context.length?
this.context[0].oLoadedState:null});p("state.save()",function(){return this.iterator("table",function(a){wa(a)})});m.versionCheck=m.fnVersionCheck=function(a){for(var b=m.version.split("."),a=a.split("."),c,d,e=0,f=a.length;e<f;e++)if(c=parseInt(b[e],10)||0,d=parseInt(a[e],10)||0,c!==d)return c>d;return!0};m.isDataTable=m.fnIsDataTable=function(a){var b=h(a).get(0),c=!1;h.each(m.settings,function(a,e){var f=e.nScrollHead?h("table",e.nScrollHead)[0]:null,g=e.nScrollFoot?h("table",e.nScrollFoot)[0]:
null;if(e.nTable===b||f===b||g===b)c=!0});return c};m.tables=m.fnTables=function(a){var b=!1;h.isPlainObject(a)&&(b=a.api,a=a.visible);var c=h.map(m.settings,function(b){if(!a||a&&h(b.nTable).is(":visible"))return b.nTable});return b?new r(c):c};m.camelToHungarian=K;p("$()",function(a,b){var c=this.rows(b).nodes(),c=h(c);return h([].concat(c.filter(a).toArray(),c.find(a).toArray()))});h.each(["on","one","off"],function(a,b){p(b+"()",function(){var a=Array.prototype.slice.call(arguments);a[0].match(/\.dt\b/)||
(a[0]+=".dt");var d=h(this.tables().nodes());d[b].apply(d,a);return this})});p("clear()",function(){return this.iterator("table",function(a){na(a)})});p("settings()",function(){return new r(this.context,this.context)});p("init()",function(){var a=this.context;return a.length?a[0].oInit:null});p("data()",function(){return this.iterator("table",function(a){return G(a.aoData,"_aData")}).flatten()});p("destroy()",function(a){a=a||!1;return this.iterator("table",function(b){var c=b.nTableWrapper.parentNode,
d=b.oClasses,e=b.nTable,f=b.nTBody,g=b.nTHead,j=b.nTFoot,i=h(e),f=h(f),k=h(b.nTableWrapper),l=h.map(b.aoData,function(a){return a.nTr}),p;b.bDestroying=!0;u(b,"aoDestroyCallback","destroy",[b]);a||(new r(b)).columns().visible(!0);k.unbind(".DT").find(":not(tbody *)").unbind(".DT");h(D).unbind(".DT-"+b.sInstance);e!=g.parentNode&&(i.children("thead").detach(),i.append(g));j&&e!=j.parentNode&&(i.children("tfoot").detach(),i.append(j));b.aaSorting=[];b.aaSortingFixed=[];va(b);h(l).removeClass(b.asStripeClasses.join(" "));
h("th, td",g).removeClass(d.sSortable+" "+d.sSortableAsc+" "+d.sSortableDesc+" "+d.sSortableNone);b.bJUI&&(h("th span."+d.sSortIcon+", td span."+d.sSortIcon,g).detach(),h("th, td",g).each(function(){var a=h("div."+d.sSortJUIWrapper,this);h(this).append(a.contents());a.detach()}));f.children().detach();f.append(l);g=a?"remove":"detach";i[g]();k[g]();!a&&c&&(c.insertBefore(e,b.nTableReinsertBefore),i.css("width",b.sDestroyWidth).removeClass(d.sTable),(p=b.asDestroyStripes.length)&&f.children().each(function(a){h(this).addClass(b.asDestroyStripes[a%
p])}));c=h.inArray(b,m.settings);-1!==c&&m.settings.splice(c,1)})});h.each(["column","row","cell"],function(a,b){p(b+"s().every()",function(a){var d=this.selector.opts,e=this;return this.iterator(b,function(f,g,h,i,n){a.call(e[b](g,"cell"===b?h:d,"cell"===b?d:k),g,h,i,n)})})});p("i18n()",function(a,b,c){var d=this.context[0],a=Q(a)(d.oLanguage);a===k&&(a=b);c!==k&&h.isPlainObject(a)&&(a=a[c]!==k?a[c]:a._);return a.replace("%d",c)});m.version="1.10.12";m.settings=[];m.models={};m.models.oSearch={bCaseInsensitive:!0,
sSearch:"",bRegex:!1,bSmart:!0};m.models.oRow={nTr:null,anCells:null,_aData:[],_aSortData:null,_aFilterData:null,_sFilterRow:null,_sRowStripe:"",src:null,idx:-1};m.models.oColumn={idx:null,aDataSort:null,asSorting:null,bSearchable:null,bSortable:null,bVisible:null,_sManualType:null,_bAttrSrc:!1,fnCreatedCell:null,fnGetData:null,fnSetData:null,mData:null,mRender:null,nTh:null,nTf:null,sClass:null,sContentPadding:null,sDefaultContent:null,sName:null,sSortDataType:"std",sSortingClass:null,sSortingClassJUI:null,
sTitle:null,sType:null,sWidth:null,sWidthOrig:null};m.defaults={aaData:null,aaSorting:[[0,"asc"]],aaSortingFixed:[],ajax:null,aLengthMenu:[10,25,50,100],aoColumns:null,aoColumnDefs:null,aoSearchCols:[],asStripeClasses:null,bAutoWidth:!0,bDeferRender:!1,bDestroy:!1,bFilter:!0,bInfo:!0,bJQueryUI:!1,bLengthChange:!0,bPaginate:!0,bProcessing:!1,bRetrieve:!1,bScrollCollapse:!1,bServerSide:!1,bSort:!0,bSortMulti:!0,bSortCellsTop:!1,bSortClasses:!0,bStateSave:!1,fnCreatedRow:null,fnDrawCallback:null,fnFooterCallback:null,
fnFormatNumber:function(a){return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,this.oLanguage.sThousands)},fnHeaderCallback:null,fnInfoCallback:null,fnInitComplete:null,fnPreDrawCallback:null,fnRowCallback:null,fnServerData:null,fnServerParams:null,fnStateLoadCallback:function(a){try{return JSON.parse((-1===a.iStateDuration?sessionStorage:localStorage).getItem("DataTables_"+a.sInstance+"_"+location.pathname))}catch(b){}},fnStateLoadParams:null,fnStateLoaded:null,fnStateSaveCallback:function(a,b){try{(-1===
a.iStateDuration?sessionStorage:localStorage).setItem("DataTables_"+a.sInstance+"_"+location.pathname,JSON.stringify(b))}catch(c){}},fnStateSaveParams:null,iStateDuration:7200,iDeferLoading:null,iDisplayLength:10,iDisplayStart:0,iTabIndex:0,oClasses:{},oLanguage:{oAria:{sSortAscending:": activate to sort column ascending",sSortDescending:": activate to sort column descending"},oPaginate:{sFirst:"First",sLast:"Last",sNext:"Next",sPrevious:"Previous"},sEmptyTable:"No data available in table",sInfo:"Showing _START_ to _END_ of _TOTAL_ entries",
sInfoEmpty:"Showing 0 to 0 of 0 entries",sInfoFiltered:"(filtered from _MAX_ total entries)",sInfoPostFix:"",sDecimal:"",sThousands:",",sLengthMenu:"Show _MENU_ entries",sLoadingRecords:"Loading...",sProcessing:"Processing...",sSearch:"Search:",sSearchPlaceholder:"",sUrl:"",sZeroRecords:"No matching records found"},oSearch:h.extend({},m.models.oSearch),sAjaxDataProp:"data",sAjaxSource:null,sDom:"lfrtip",searchDelay:null,sPaginationType:"simple_numbers",sScrollX:"",sScrollXInner:"",sScrollY:"",sServerMethod:"GET",
renderer:null,rowId:"DT_RowId"};X(m.defaults);m.defaults.column={aDataSort:null,iDataSort:-1,asSorting:["asc","desc"],bSearchable:!0,bSortable:!0,bVisible:!0,fnCreatedCell:null,mData:null,mRender:null,sCellType:"td",sClass:"",sContentPadding:"",sDefaultContent:null,sName:"",sSortDataType:"std",sTitle:null,sType:null,sWidth:null};X(m.defaults.column);m.models.oSettings={oFeatures:{bAutoWidth:null,bDeferRender:null,bFilter:null,bInfo:null,bLengthChange:null,bPaginate:null,bProcessing:null,bServerSide:null,
bSort:null,bSortMulti:null,bSortClasses:null,bStateSave:null},oScroll:{bCollapse:null,iBarWidth:0,sX:null,sXInner:null,sY:null},oLanguage:{fnInfoCallback:null},oBrowser:{bScrollOversize:!1,bScrollbarLeft:!1,bBounding:!1,barWidth:0},ajax:null,aanFeatures:[],aoData:[],aiDisplay:[],aiDisplayMaster:[],aIds:{},aoColumns:[],aoHeader:[],aoFooter:[],oPreviousSearch:{},aoPreSearchCols:[],aaSorting:null,aaSortingFixed:[],asStripeClasses:null,asDestroyStripes:[],sDestroyWidth:0,aoRowCallback:[],aoHeaderCallback:[],
aoFooterCallback:[],aoDrawCallback:[],aoRowCreatedCallback:[],aoPreDrawCallback:[],aoInitComplete:[],aoStateSaveParams:[],aoStateLoadParams:[],aoStateLoaded:[],sTableId:"",nTable:null,nTHead:null,nTFoot:null,nTBody:null,nTableWrapper:null,bDeferLoading:!1,bInitialised:!1,aoOpenRows:[],sDom:null,searchDelay:null,sPaginationType:"two_button",iStateDuration:0,aoStateSave:[],aoStateLoad:[],oSavedState:null,oLoadedState:null,sAjaxSource:null,sAjaxDataProp:null,bAjaxDataGet:!0,jqXHR:null,json:k,oAjaxData:k,
fnServerData:null,aoServerParams:[],sServerMethod:null,fnFormatNumber:null,aLengthMenu:null,iDraw:0,bDrawing:!1,iDrawError:-1,_iDisplayLength:10,_iDisplayStart:0,_iRecordsTotal:0,_iRecordsDisplay:0,bJUI:null,oClasses:{},bFiltered:!1,bSorted:!1,bSortCellsTop:null,oInit:null,aoDestroyCallback:[],fnRecordsTotal:function(){return"ssp"==y(this)?1*this._iRecordsTotal:this.aiDisplayMaster.length},fnRecordsDisplay:function(){return"ssp"==y(this)?1*this._iRecordsDisplay:this.aiDisplay.length},fnDisplayEnd:function(){var a=
this._iDisplayLength,b=this._iDisplayStart,c=b+a,d=this.aiDisplay.length,e=this.oFeatures,f=e.bPaginate;return e.bServerSide?!1===f||-1===a?b+d:Math.min(b+a,this._iRecordsDisplay):!f||c>d||-1===a?d:c},oInstance:null,sInstance:null,iTabIndex:0,nScrollHead:null,nScrollFoot:null,aLastSort:[],oPlugins:{},rowIdFn:null,rowId:null};m.ext=v={buttons:{},classes:{},build:"dt/dt-1.10.12/r-2.1.0",errMode:"alert",feature:[],search:[],selector:{cell:[],column:[],row:[]},internal:{},legacy:{ajax:null},pager:{},renderer:{pageButton:{},
header:{}},order:{},type:{detect:[],search:{},order:{}},_unique:0,fnVersionCheck:m.fnVersionCheck,iApiIndex:0,oJUIClasses:{},sVersion:m.version};h.extend(v,{afnFiltering:v.search,aTypes:v.type.detect,ofnSearch:v.type.search,oSort:v.type.order,afnSortData:v.order,aoFeatures:v.feature,oApi:v.internal,oStdClasses:v.classes,oPagination:v.pager});h.extend(m.ext.classes,{sTable:"dataTable",sNoFooter:"no-footer",sPageButton:"paginate_button",sPageButtonActive:"current",sPageButtonDisabled:"disabled",sStripeOdd:"odd",
sStripeEven:"even",sRowEmpty:"dataTables_empty",sWrapper:"dataTables_wrapper",sFilter:"dataTables_filter",sInfo:"dataTables_info",sPaging:"dataTables_paginate paging_",sLength:"dataTables_length",sProcessing:"dataTables_processing",sSortAsc:"sorting_asc",sSortDesc:"sorting_desc",sSortable:"sorting",sSortableAsc:"sorting_asc_disabled",sSortableDesc:"sorting_desc_disabled",sSortableNone:"sorting_disabled",sSortColumn:"sorting_",sFilterInput:"",sLengthSelect:"",sScrollWrapper:"dataTables_scroll",sScrollHead:"dataTables_scrollHead",
sScrollHeadInner:"dataTables_scrollHeadInner",sScrollBody:"dataTables_scrollBody",sScrollFoot:"dataTables_scrollFoot",sScrollFootInner:"dataTables_scrollFootInner",sHeaderTH:"",sFooterTH:"",sSortJUIAsc:"",sSortJUIDesc:"",sSortJUI:"",sSortJUIAscAllowed:"",sSortJUIDescAllowed:"",sSortJUIWrapper:"",sSortIcon:"",sJUIHeader:"",sJUIFooter:""});var Ca="",Ca="",H=Ca+"ui-state-default",ia=Ca+"css_right ui-icon ui-icon-",Xb=Ca+"fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix";h.extend(m.ext.oJUIClasses,
m.ext.classes,{sPageButton:"fg-button ui-button "+H,sPageButtonActive:"ui-state-disabled",sPageButtonDisabled:"ui-state-disabled",sPaging:"dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",sSortAsc:H+" sorting_asc",sSortDesc:H+" sorting_desc",sSortable:H+" sorting",sSortableAsc:H+" sorting_asc_disabled",sSortableDesc:H+" sorting_desc_disabled",sSortableNone:H+" sorting_disabled",sSortJUIAsc:ia+"triangle-1-n",sSortJUIDesc:ia+"triangle-1-s",sSortJUI:ia+"carat-2-n-s",
sSortJUIAscAllowed:ia+"carat-1-n",sSortJUIDescAllowed:ia+"carat-1-s",sSortJUIWrapper:"DataTables_sort_wrapper",sSortIcon:"DataTables_sort_icon",sScrollHead:"dataTables_scrollHead "+H,sScrollFoot:"dataTables_scrollFoot "+H,sHeaderTH:H,sFooterTH:H,sJUIHeader:Xb+" ui-corner-tl ui-corner-tr",sJUIFooter:Xb+" ui-corner-bl ui-corner-br"});var Mb=m.ext.pager;h.extend(Mb,{simple:function(){return["previous","next"]},full:function(){return["first","previous","next","last"]},numbers:function(a,b){return[ya(a,
b)]},simple_numbers:function(a,b){return["previous",ya(a,b),"next"]},full_numbers:function(a,b){return["first","previous",ya(a,b),"next","last"]},_numbers:ya,numbers_length:7});h.extend(!0,m.ext.renderer,{pageButton:{_:function(a,b,c,d,e,f){var g=a.oClasses,j=a.oLanguage.oPaginate,i=a.oLanguage.oAria.paginate||{},k,l,m=0,p=function(b,d){var o,r,u,s,v=function(b){Ta(a,b.data.action,true)};o=0;for(r=d.length;o<r;o++){s=d[o];if(h.isArray(s)){u=h("<"+(s.DT_el||"div")+"/>").appendTo(b);p(u,s)}else{k=null;
l="";switch(s){case "ellipsis":b.append('<span class="ellipsis">&#x2026;</span>');break;case "first":k=j.sFirst;l=s+(e>0?"":" "+g.sPageButtonDisabled);break;case "previous":k=j.sPrevious;l=s+(e>0?"":" "+g.sPageButtonDisabled);break;case "next":k=j.sNext;l=s+(e<f-1?"":" "+g.sPageButtonDisabled);break;case "last":k=j.sLast;l=s+(e<f-1?"":" "+g.sPageButtonDisabled);break;default:k=s+1;l=e===s?g.sPageButtonActive:""}if(k!==null){u=h("<a>",{"class":g.sPageButton+" "+l,"aria-controls":a.sTableId,"aria-label":i[s],
"data-dt-idx":m,tabindex:a.iTabIndex,id:c===0&&typeof s==="string"?a.sTableId+"_"+s:null}).html(k).appendTo(b);Wa(u,{action:s},v);m++}}}},r;try{r=h(b).find(I.activeElement).data("dt-idx")}catch(o){}p(h(b).empty(),d);r&&h(b).find("[data-dt-idx="+r+"]").focus()}}});h.extend(m.ext.type.detect,[function(a,b){var c=b.oLanguage.sDecimal;return Za(a,c)?"num"+c:null},function(a){if(a&&!(a instanceof Date)&&(!ac.test(a)||!bc.test(a)))return null;var b=Date.parse(a);return null!==b&&!isNaN(b)||M(a)?"date":
null},function(a,b){var c=b.oLanguage.sDecimal;return Za(a,c,!0)?"num-fmt"+c:null},function(a,b){var c=b.oLanguage.sDecimal;return Rb(a,c)?"html-num"+c:null},function(a,b){var c=b.oLanguage.sDecimal;return Rb(a,c,!0)?"html-num-fmt"+c:null},function(a){return M(a)||"string"===typeof a&&-1!==a.indexOf("<")?"html":null}]);h.extend(m.ext.type.search,{html:function(a){return M(a)?a:"string"===typeof a?a.replace(Ob," ").replace(Aa,""):""},string:function(a){return M(a)?a:"string"===typeof a?a.replace(Ob,
" "):a}});var za=function(a,b,c,d){if(0!==a&&(!a||"-"===a))return-Infinity;b&&(a=Qb(a,b));a.replace&&(c&&(a=a.replace(c,"")),d&&(a=a.replace(d,"")));return 1*a};h.extend(v.type.order,{"date-pre":function(a){return Date.parse(a)||0},"html-pre":function(a){return M(a)?"":a.replace?a.replace(/<.*?>/g,"").toLowerCase():a+""},"string-pre":function(a){return M(a)?"":"string"===typeof a?a.toLowerCase():!a.toString?"":a.toString()},"string-asc":function(a,b){return a<b?-1:a>b?1:0},"string-desc":function(a,
b){return a<b?1:a>b?-1:0}});db("");h.extend(!0,m.ext.renderer,{header:{_:function(a,b,c,d){h(a.nTable).on("order.dt.DT",function(e,f,g,h){if(a===f){e=c.idx;b.removeClass(c.sSortingClass+" "+d.sSortAsc+" "+d.sSortDesc).addClass(h[e]=="asc"?d.sSortAsc:h[e]=="desc"?d.sSortDesc:c.sSortingClass)}})},jqueryui:function(a,b,c,d){h("<div/>").addClass(d.sSortJUIWrapper).append(b.contents()).append(h("<span/>").addClass(d.sSortIcon+" "+c.sSortingClassJUI)).appendTo(b);h(a.nTable).on("order.dt.DT",function(e,
f,g,h){if(a===f){e=c.idx;b.removeClass(d.sSortAsc+" "+d.sSortDesc).addClass(h[e]=="asc"?d.sSortAsc:h[e]=="desc"?d.sSortDesc:c.sSortingClass);b.find("span."+d.sSortIcon).removeClass(d.sSortJUIAsc+" "+d.sSortJUIDesc+" "+d.sSortJUI+" "+d.sSortJUIAscAllowed+" "+d.sSortJUIDescAllowed).addClass(h[e]=="asc"?d.sSortJUIAsc:h[e]=="desc"?d.sSortJUIDesc:c.sSortingClassJUI)}})}}});var Yb=function(a){return"string"===typeof a?a.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):a};m.render={number:function(a,
b,c,d,e){return{display:function(f){if("number"!==typeof f&&"string"!==typeof f)return f;var g=0>f?"-":"",h=parseFloat(f);if(isNaN(h))return Yb(f);f=Math.abs(h);h=parseInt(f,10);f=c?b+(f-h).toFixed(c).substring(2):"";return g+(d||"")+h.toString().replace(/\B(?=(\d{3})+(?!\d))/g,a)+f+(e||"")}}},text:function(){return{display:Yb}}};h.extend(m.ext.internal,{_fnExternApiFunc:Nb,_fnBuildAjax:ra,_fnAjaxUpdate:lb,_fnAjaxParameters:ub,_fnAjaxUpdateDraw:vb,_fnAjaxDataSrc:sa,_fnAddColumn:Ea,_fnColumnOptions:ja,
_fnAdjustColumnSizing:Y,_fnVisibleToColumnIndex:Z,_fnColumnIndexToVisible:$,_fnVisbleColumns:aa,_fnGetColumns:la,_fnColumnTypes:Ga,_fnApplyColumnDefs:ib,_fnHungarianMap:X,_fnCamelToHungarian:K,_fnLanguageCompat:Da,_fnBrowserDetect:gb,_fnAddData:N,_fnAddTr:ma,_fnNodeToDataIndex:function(a,b){return b._DT_RowIndex!==k?b._DT_RowIndex:null},_fnNodeToColumnIndex:function(a,b,c){return h.inArray(c,a.aoData[b].anCells)},_fnGetCellData:B,_fnSetCellData:jb,_fnSplitObjNotation:Ja,_fnGetObjectDataFn:Q,_fnSetObjectDataFn:R,
_fnGetDataMaster:Ka,_fnClearTable:na,_fnDeleteIndex:oa,_fnInvalidate:ca,_fnGetRowElements:Ia,_fnCreateTr:Ha,_fnBuildHead:kb,_fnDrawHead:ea,_fnDraw:O,_fnReDraw:T,_fnAddOptionsHtml:nb,_fnDetectHeader:da,_fnGetUniqueThs:qa,_fnFeatureHtmlFilter:pb,_fnFilterComplete:fa,_fnFilterCustom:yb,_fnFilterColumn:xb,_fnFilter:wb,_fnFilterCreateSearch:Pa,_fnEscapeRegex:Qa,_fnFilterData:zb,_fnFeatureHtmlInfo:sb,_fnUpdateInfo:Cb,_fnInfoMacros:Db,_fnInitialise:ga,_fnInitComplete:ta,_fnLengthChange:Ra,_fnFeatureHtmlLength:ob,
_fnFeatureHtmlPaginate:tb,_fnPageChange:Ta,_fnFeatureHtmlProcessing:qb,_fnProcessingDisplay:C,_fnFeatureHtmlTable:rb,_fnScrollDraw:ka,_fnApplyToChildren:J,_fnCalculateColumnWidths:Fa,_fnThrottle:Oa,_fnConvertToWidth:Fb,_fnGetWidestNode:Gb,_fnGetMaxLenString:Hb,_fnStringToCss:x,_fnSortFlatten:V,_fnSort:mb,_fnSortAria:Jb,_fnSortListener:Va,_fnSortAttachListener:Ma,_fnSortingClasses:va,_fnSortData:Ib,_fnSaveState:wa,_fnLoadState:Kb,_fnSettingsFromNode:xa,_fnLog:L,_fnMap:E,_fnBindAction:Wa,_fnCallbackReg:z,
_fnCallbackFire:u,_fnLengthOverflow:Sa,_fnRenderer:Na,_fnDataSource:y,_fnRowAttributes:La,_fnCalculateEnd:function(){}});h.fn.dataTable=m;m.$=h;h.fn.dataTableSettings=m.settings;h.fn.dataTableExt=m.ext;h.fn.DataTable=function(a){return h(this).dataTable(a).api()};h.each(m,function(a,b){h.fn.DataTable[a]=b});return h.fn.dataTable});


/*!
 Responsive 2.1.0
 2014-2016 SpryMedia Ltd - datatables.net/license
*/
(function(c){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(l){return c(l,window,document)}):"object"===typeof exports?module.exports=function(l,k){l||(l=window);if(!k||!k.fn.dataTable)k=require("datatables.net")(l,k).$;return c(k,l,l.document)}:c(jQuery,window,document)})(function(c,l,k,p){var m=c.fn.dataTable,j=function(a,b){if(!m.versionCheck||!m.versionCheck("1.10.3"))throw"DataTables Responsive requires DataTables 1.10.3 or newer";this.s={dt:new m.Api(a),columns:[],
current:[]};this.s.dt.settings()[0].responsive||(b&&"string"===typeof b.details?b.details={type:b.details}:b&&!1===b.details?b.details={type:!1}:b&&!0===b.details&&(b.details={type:"inline"}),this.c=c.extend(!0,{},j.defaults,m.defaults.responsive,b),a.responsive=this,this._constructor())};c.extend(j.prototype,{_constructor:function(){var a=this,b=this.s.dt,d=b.settings()[0],e=c(l).width();b.settings()[0]._responsive=this;c(l).on("resize.dtr orientationchange.dtr",m.util.throttle(function(){var b=
c(l).width();b!==e&&(a._resize(),e=b)}));d.oApi._fnCallbackReg(d,"aoRowCreatedCallback",function(e){-1!==c.inArray(!1,a.s.current)&&c("td, th",e).each(function(e){e=b.column.index("toData",e);!1===a.s.current[e]&&c(this).css("display","none")})});b.on("destroy.dtr",function(){b.off(".dtr");c(b.table().body()).off(".dtr");c(l).off("resize.dtr orientationchange.dtr");c.each(a.s.current,function(b,e){!1===e&&a._setColumnVis(b,!0)})});this.c.breakpoints.sort(function(a,b){return a.width<b.width?1:a.width>
b.width?-1:0});this._classLogic();this._resizeAuto();d=this.c.details;!1!==d.type&&(a._detailsInit(),b.on("column-visibility.dtr",function(){a._classLogic();a._resizeAuto();a._resize()}),b.on("draw.dtr",function(){a._redrawChildren()}),c(b.table().node()).addClass("dtr-"+d.type));b.on("column-reorder.dtr",function(){a._classLogic();a._resizeAuto();a._resize()});b.on("column-sizing.dtr",function(){a._resizeAuto();a._resize()});b.on("init.dtr",function(){a._resizeAuto();a._resize();c.inArray(false,
a.s.current)&&b.columns.adjust()});this._resize()},_columnsVisiblity:function(a){var b=this.s.dt,d=this.s.columns,e,f,g=d.map(function(a,b){return{columnIdx:b,priority:a.priority}}).sort(function(a,b){return a.priority!==b.priority?a.priority-b.priority:a.columnIdx-b.columnIdx}),h=c.map(d,function(b){return b.auto&&null===b.minWidth?!1:!0===b.auto?"-":-1!==c.inArray(a,b.includeIn)}),n=0;e=0;for(f=h.length;e<f;e++)!0===h[e]&&(n+=d[e].minWidth);e=b.settings()[0].oScroll;e=e.sY||e.sX?e.iBarWidth:0;b=
b.table().container().offsetWidth-e-n;e=0;for(f=h.length;e<f;e++)d[e].control&&(b-=d[e].minWidth);n=!1;e=0;for(f=g.length;e<f;e++){var i=g[e].columnIdx;"-"===h[i]&&(!d[i].control&&d[i].minWidth)&&(n||0>b-d[i].minWidth?(n=!0,h[i]=!1):h[i]=!0,b-=d[i].minWidth)}g=!1;e=0;for(f=d.length;e<f;e++)if(!d[e].control&&!d[e].never&&!h[e]){g=!0;break}e=0;for(f=d.length;e<f;e++)d[e].control&&(h[e]=g);-1===c.inArray(!0,h)&&(h[0]=!0);return h},_classLogic:function(){var a=this,b=this.c.breakpoints,d=this.s.dt,e=
d.columns().eq(0).map(function(a){var b=this.column(a),e=b.header().className,a=d.settings()[0].aoColumns[a].responsivePriority;a===p&&(b=c(b.header()).data("priority"),a=b!==p?1*b:1E4);return{className:e,includeIn:[],auto:!1,control:!1,never:e.match(/\bnever\b/)?!0:!1,priority:a}}),f=function(a,b){var d=e[a].includeIn;-1===c.inArray(b,d)&&d.push(b)},g=function(c,d,i,g){if(i)if("max-"===i){g=a._find(d).width;d=0;for(i=b.length;d<i;d++)b[d].width<=g&&f(c,b[d].name)}else if("min-"===i){g=a._find(d).width;
d=0;for(i=b.length;d<i;d++)b[d].width>=g&&f(c,b[d].name)}else{if("not-"===i){d=0;for(i=b.length;d<i;d++)-1===b[d].name.indexOf(g)&&f(c,b[d].name)}}else e[c].includeIn.push(d)};e.each(function(a,e){for(var d=a.className.split(" "),f=!1,j=0,l=d.length;j<l;j++){var k=c.trim(d[j]);if("all"===k){f=!0;a.includeIn=c.map(b,function(a){return a.name});return}if("none"===k||a.never){f=!0;return}if("control"===k){f=!0;a.control=!0;return}c.each(b,function(a,b){var d=b.name.split("-"),c=k.match(RegExp("(min\\-|max\\-|not\\-)?("+
d[0]+")(\\-[_a-zA-Z0-9])?"));c&&(f=!0,c[2]===d[0]&&c[3]==="-"+d[1]?g(e,b.name,c[1],c[2]+c[3]):c[2]===d[0]&&!c[3]&&g(e,b.name,c[1],c[2]))})}f||(a.auto=!0)});this.s.columns=e},_detailsDisplay:function(a,b){var d=this,e=this.s.dt,f=this.c.details;if(f&&!1!==f.type){var g=f.display(a,b,function(){return f.renderer(e,a[0],d._detailsObj(a[0]))});(!0===g||!1===g)&&c(e.table().node()).triggerHandler("responsive-display.dt",[e,a,g,b])}},_detailsInit:function(){var a=this,b=this.s.dt,d=this.c.details;"inline"===
d.type&&(d.target="td:first-child, th:first-child");b.on("draw.dtr",function(){a._tabIndexes()});a._tabIndexes();c(b.table().body()).on("keyup.dtr","td, th",function(a){a.keyCode===13&&c(this).data("dtr-keyboard")&&c(this).click()});var e=d.target;c(b.table().body()).on("click.dtr mousedown.dtr mouseup.dtr","string"===typeof e?e:"td, th",function(d){if(c(b.table().node()).hasClass("collapsed")&&b.row(c(this).closest("tr")).length){if(typeof e==="number"){var g=e<0?b.columns().eq(0).length+e:e;if(b.cell(this).index().column!==
g)return}g=b.row(c(this).closest("tr"));d.type==="click"?a._detailsDisplay(g,false):d.type==="mousedown"?c(this).css("outline","none"):d.type==="mouseup"&&c(this).blur().css("outline","")}})},_detailsObj:function(a){var b=this,d=this.s.dt;return c.map(this.s.columns,function(e,c){if(!e.never&&!e.control)return{title:d.settings()[0].aoColumns[c].sTitle,data:d.cell(a,c).render(b.c.orthogonal),hidden:d.column(c).visible()&&!b.s.current[c],columnIndex:c,rowIndex:a}})},_find:function(a){for(var b=this.c.breakpoints,
d=0,c=b.length;d<c;d++)if(b[d].name===a)return b[d]},_redrawChildren:function(){var a=this,b=this.s.dt;b.rows({page:"current"}).iterator("row",function(c,e){b.row(e);a._detailsDisplay(b.row(e),!0)})},_resize:function(){var a=this,b=this.s.dt,d=c(l).width(),e=this.c.breakpoints,f=e[0].name,g=this.s.columns,h,j=this.s.current.slice();for(h=e.length-1;0<=h;h--)if(d<=e[h].width){f=e[h].name;break}var i=this._columnsVisiblity(f);this.s.current=i;e=!1;h=0;for(d=g.length;h<d;h++)if(!1===i[h]&&!g[h].never&&
!g[h].control){e=!0;break}c(b.table().node()).toggleClass("collapsed",e);var k=!1;b.columns().eq(0).each(function(b,c){i[c]!==j[c]&&(k=!0,a._setColumnVis(b,i[c]))});k&&(this._redrawChildren(),c(b.table().node()).trigger("responsive-resize.dt",[b,this.s.current]))},_resizeAuto:function(){var a=this.s.dt,b=this.s.columns;if(this.c.auto&&-1!==c.inArray(!0,c.map(b,function(a){return a.auto}))){a.table().node();var d=a.table().node().cloneNode(!1),e=c(a.table().header().cloneNode(!1)).appendTo(d),f=c(a.table().body()).clone(!1,
!1).empty().appendTo(d),g=a.columns().header().filter(function(b){return a.column(b).visible()}).to$().clone(!1).css("display","table-cell");c(f).append(c(a.rows({page:"current"}).nodes()).clone(!1)).find("th, td").css("display","");if(f=a.table().footer()){var f=c(f.cloneNode(!1)).appendTo(d),h=a.columns().footer().filter(function(b){return a.column(b).visible()}).to$().clone(!1).css("display","table-cell");c("<tr/>").append(h).appendTo(f)}c("<tr/>").append(g).appendTo(e);"inline"===this.c.details.type&&
c(d).addClass("dtr-inline collapsed");c(d).find("[name]").removeAttr("name");d=c("<div/>").css({width:1,height:1,overflow:"hidden"}).append(d);d.insertBefore(a.table().node());g.each(function(c){c=a.column.index("fromVisible",c);b[c].minWidth=this.offsetWidth||0});d.remove()}},_setColumnVis:function(a,b){var d=this.s.dt,e=b?"":"none";c(d.column(a).header()).css("display",e);c(d.column(a).footer()).css("display",e);d.column(a).nodes().to$().css("display",e)},_tabIndexes:function(){var a=this.s.dt,
b=a.cells({page:"current"}).nodes().to$(),d=a.settings()[0],e=this.c.details.target;b.filter("[data-dtr-keyboard]").removeData("[data-dtr-keyboard]");c("number"===typeof e?":eq("+e+")":e,a.rows({page:"current"}).nodes()).attr("tabIndex",d.iTabIndex).data("dtr-keyboard",1)}});j.breakpoints=[{name:"desktop",width:Infinity},{name:"tablet-l",width:1024},{name:"tablet-p",width:768},{name:"mobile-l",width:480},{name:"mobile-p",width:320}];j.display={childRow:function(a,b,d){if(b){if(c(a.node()).hasClass("parent"))return a.child(d(),
"child").show(),!0}else{if(a.child.isShown())return a.child(!1),c(a.node()).removeClass("parent"),!1;a.child(d(),"child").show();c(a.node()).addClass("parent");return!0}},childRowImmediate:function(a,b,d){if(!b&&a.child.isShown()||!a.responsive.hasHidden())return a.child(!1),c(a.node()).removeClass("parent"),!1;a.child(d(),"child").show();c(a.node()).addClass("parent");return!0},modal:function(a){return function(b,d,e){if(d)c("div.dtr-modal-content").empty().append(e());else{var f=function(){g.remove();
c(k).off("keypress.dtr")},g=c('<div class="dtr-modal"/>').append(c('<div class="dtr-modal-display"/>').append(c('<div class="dtr-modal-content"/>').append(e())).append(c('<div class="dtr-modal-close">&times;</div>').click(function(){f()}))).append(c('<div class="dtr-modal-background"/>').click(function(){f()})).appendTo("body");c(k).on("keyup.dtr",function(a){27===a.keyCode&&(a.stopPropagation(),f())})}a&&a.header&&c("div.dtr-modal-content").prepend("<h2>"+a.header(b)+"</h2>")}}};j.renderer={listHidden:function(){return function(a,
b,d){return(a=c.map(d,function(a){return a.hidden?'<li data-dtr-index="'+a.columnIndex+'" data-dt-row="'+a.rowIndex+'" data-dt-column="'+a.columnIndex+'"><span class="dtr-title">'+a.title+'</span> <span class="dtr-data">'+a.data+"</span></li>":""}).join(""))?c('<ul data-dtr-index="'+b+'"/>').append(a):!1}},tableAll:function(a){a=c.extend({tableClass:""},a);return function(b,d,e){b=c.map(e,function(a){return'<tr data-dt-row="'+a.rowIndex+'" data-dt-column="'+a.columnIndex+'"><td>'+a.title+":</td> <td>"+
a.data+"</td></tr>"}).join("");return c('<table class="'+a.tableClass+'" width="100%"/>').append(b)}}};j.defaults={breakpoints:j.breakpoints,auto:!0,details:{display:j.display.childRow,renderer:j.renderer.listHidden(),target:0,type:"inline"},orthogonal:"display"};var o=c.fn.dataTable.Api;o.register("responsive()",function(){return this});o.register("responsive.index()",function(a){a=c(a);return{column:a.data("dtr-index"),row:a.parent().data("dtr-index")}});o.register("responsive.rebuild()",function(){return this.iterator("table",
function(a){a._responsive&&a._responsive._classLogic()})});o.register("responsive.recalc()",function(){return this.iterator("table",function(a){a._responsive&&(a._responsive._resizeAuto(),a._responsive._resize())})});o.register("responsive.hasHidden()",function(){var a=this.context[0];return a._responsive?-1!==c.inArray(!1,a._responsive.s.current):!1});j.version="2.1.0";c.fn.dataTable.Responsive=j;c.fn.DataTable.Responsive=j;c(k).on("preInit.dt.dtr",function(a,b){if("dt"===a.namespace&&(c(b.nTable).hasClass("responsive")||
c(b.nTable).hasClass("dt-responsive")||b.oInit.responsive||m.defaults.responsive)){var d=b.oInit.responsive;!1!==d&&new j(b,c.isPlainObject(d)?d:{})}});return j});


/***
* ██████╗  █████╗ ██████╗      ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗
* ██╔══██╗██╔══██╗██╔══██╗    ██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝
* ██████╔╝███████║██████╔╝    ██║     ███████║███████║██████╔╝   ██║
* ██╔══██╗██╔══██║██╔══██╗    ██║     ██╔══██║██╔══██║██╔══██╗   ██║
* ██████╔╝██║  ██║██║  ██║    ╚██████╗██║  ██║██║  ██║██║  ██║   ██║
* ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
*
*      ____   _                   _    _
*     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
*     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
*     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
*     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
*
*    This directive renders a bar chart.
*/

PARTICLE.directive('smartChart', function ($parse, $window, $timeout) {

  /* Usage:
    1. <needle-chart></needle-chart> is semantically

    Attr Params:
      1. config
      2. datasets*/

    var directiveDefinitionObject = {
        //Restrict use to an element
        restrict: 'E',
        //Do NOT overwrite our directive declaration in the HTML mark-up
        replace: false,
        //Chart data and config passed thru attributes
        scope: {
            config: '=',
            datasets: "=",
            colors: "=",
            percentcomplete: "=",
            successpercent: "=",
            max:"=",
            min:"=",
            mockup:"=",
            index:"="
        },
    link: function (scope, element, attrs) {
        var drawn = 0;

    $timeout(function() {
        if (element.parent().height()) {
            if(drawn===0){
                drawMe();
                drawn=1;
            }
        }
    },
    1);

    var drawMe = function(indexval) {

      console.log("BARCHART DARW");
        if (indexval === null) {
            return null;
        }
        var width, height, dataset, layers;

        /***
         *    DEFAULT
         *          _                          _              _    _    _
         *     ___ |_| ___  ___    ___  ___  _| |   ___  ___ | |_ | |_ |_| ___  ___  ___
         *    |_ -|| ||- _|| -_|  | .'||   || . |  |_ -|| -_||  _||  _|| ||   || . ||_ -|
         *    |___||_||___||___|  |__,||_|_||___|  |___||___||_|  |_|  |_||_|_||_  ||___|
         *                                                                     |___|
         *

                  chartInset  :: istance from the edge of the drawn SVG
                  margin      :: standard top, right...... in pixels - no being used at moment....
                  barWidth    :: thickness/width of bar in pixels, might make this a percent in the future...
                  successIndicatorDegWidth      :: the number of degrees the success indicator should span from its start point
                                                :: set to 0 to make it go to the very end of the chart

          **********************************************/
          var config = {
              chartInset:0,
              hasSuccessIndicator:true,
              hasBandIndicator:false,
              margin: {
                  top: 20,
                  right: 20,
                  bottom: 60,
                  left: 60
              },
              barWidth:10,
              widthPercentSize:1.1,
              needLength:1,
              colors: {
                  primary_fill: "color-pewter",
                  color_2: "boldorange-0-fade-1",
                  success: "color-bluepuddy-0-fade-5",
                  needle: "color-pewter-0-fade-0",
                  bg: "color-white-6-fade-8",
                  legend:"color-bluepuddy-8-fade-0"
              },
              max:100,
              min:0
          }; // End config

          /***
          *                                     _                _       ___            _  _
          *     ___  _ _  ___  ___  _ _ _  ___ |_|| |_  ___    _| | ___ |  _| ___  _ _ | || |_  ___
          *    | . || | || -_||  _|| | | ||  _|| ||  _|| -_|  | . || -_||  _|| .'|| | || ||  _||_ -|
          *    |___| \_/ |___||_|  |_____||_|  |_||_|  |___|  |___||___||_|  |__,||___||_||_|  |___|
          *
          */

          if (scope.config !== undefined){
              Object.keys(scope.config).forEach(function(key,index) {
                  config[key] = scope.config[key];
              });
          }

          /***
          *                 _                                         _
          *     _____  ___ |_| ___    ___  ___  ___  ___  ___  ___  _| | _ _  ___  ___
          *    |     || .'|| ||   |  | . ||  _|| . ||  _|| -_|| -_|| . || | ||  _|| -_|
          *    |_|_|_||__,||_||_|_|  |  _||_|  |___||___||___||___||___||___||_|  |___|
          *                          |_|
          */

          /***
          *
          *     ___
          *    |_  |
          *     _| |_  _
          *    |_____||_|   Select the directive element to push our SVG into:
          *
          */

          el = d3.select(element[0]);

          /***
          *
          *     ___
          *    |_  |
          *    |  _| _     Calculate the width of the width and height of the chart
          *    |___||_|    Height is fixed to 200, width varies with parent element width
          *
          */

          width = element[0].parentElement.clientWidth;
          height = 200;

          /***
          *     ___
          *    |_  |
          *    |_  | _
          *    |___||_|    Prepare dataset to be used by D3
          *                Update this section to match updated dataset
          */

          dataset = scope.datasets;
          var spending = ["DME", "OM"];
          var parseDate = d3.time.format("%m/%Y").parse;

              // Function below establishes start and end dates for the graph and removes
              // the values that fall outside the range. It also parses data elements in X and Y
              // components that will be used for plotting.



              // Parse the data
              layers = sub.map(function(d) {
                  return {x: d.date, y: +d.rating, y0: +0};
              });

            layers = d3.layout.stack()(spending.map(function(c) {
                return dataset.map(function(d) {
                    return {x: d.date, y: d[c]};
                });
            }));
          /***
          *     ___
          *    | | |
          *    |_  | _
          *      |_||_|    Create Chart Objects: X/Y Scales, Primary Chart Object,
          *                X/Y Axes, and Data Bars.
          */

              // Define X Scale
              xScale = d3.time.scale()
                  .domain([startdate, enddate])
                  .range([0 + config.margin.left, width - config.margin.right]);

              // Define Y Scale
              yScale = d3.scale.linear()
                  .domain([0, 5])
                  .range([height-config.margin.bottom, config.margin.top])
                  .nice();

              var x = d3.scale.ordinal()
                  .rangeRoundBands([0, width]);

              var y = d3.scale.linear()
                  .rangeRound([height, 0]);

              var z = d3.scale.category10();

              var chart = el.append("svg")
                  .attr("height",height)
                  .attr("width",width)
                  .attr("class", "chart");

              var xAxis = d3.svg.axis()
                  .scale(x)
                  .orient("bottom")
                  .tickFormat(d3.time.format("%b"));

              var yAxis = d3.svg.axis()
                  .scale(y)
                  .orient("left");

              var x_axis = chart.append("g") // Draw axes: x axis
                  .attr("id","xaxis"+indexval)
                  .attr("class", "axis x")
                  .attr("transform","translate(0, " + (height - config.margin.bottom) + ")")
                  .call(xAxis)
                      .selectAll("text")
                      .style("text-anchor", function(d) {
                          if(d.getMonth() !== 0){
                              return "middle";
                          } else {
                              return "start";
                          }
                      })
                      .attr("dy", "10px")
                      .attr("transform", function(d) {
                          if(d.getMonth() !== 0){
                              return "translate(" + xtickdist/2 + ", 0)";
                          }
                      })
                      .style("font-weight", function(d) {
                          if(d.getMonth() === 0){
                              return "bold";
                          }
                      });

              var y_axis = chart.append("g") // Draw axes: y axis
                  .attr("id","yaxis"+indexval)
                  .attr("class", "axis y")
                  .attr("transform","translate(" + config.margin.left + ",0)")
                  .call(yAxis)
                      .selectAll("text")
                      .attr("transform","translate(0, " + ytickdist/2 + ")")
                      .style("text-anchor", "middle")
                      .text(function(d) {
                          if(d == "0"){
                              return null;
                          } else {
                              return d;
                          }
                      });
              var yTick = (height - config.margin.top - config.margin.bottom)/yticks;
              console.log(yTick);
              d3.select("#yaxis"+indexval)
                  .append("text")
                  .attr("x", (-height + config.margin.bottom + config.margin.top)/2 - config.margin.top)
                  .attr("y", -config.margin.left/2)
                  .attr("transform", "rotate(-90)")
                  .attr("text-anchor", "middle")
                  .style("font-weight", "bold")
                  .text("Rating");

              d3.select("#xaxis"+indexval)
                  .append("text")
                  .attr("y", 50)
                  .attr("x", (0.5 * width))
                  .attr("text-anchor", "middle")
                  .style("font-weight", "bold")
                  .text("Submission Date");

              var bars = chart.selectAll("rect") // Create Bars
                  .data(layers)
                  .enter()
                  .append("rect")
                      .attr("x",function(d){
                          return xScale(d.x);
                      })
                      .attr("y", function(d) {
                          return yScale(d.y0 + d.y);
                      })
                      .attr("width", config.barWidth)
                      .attr("height", function(d) {
                          return yScale(d.y0) - yScale(d.y + d.y0);
                      })
                      .attr("date", function(d) {
                          return d.x;
                      })
                      .attr("rating", function(d){
                          return d.y;
                      })
                      .style("fill", function(d) {
                          if(d.y == 3) {
                              return "#f78c00";
                          } else if (d.y == "1" | d.y == "2") {
                              return "#b30000";
                          } else if (d.y == "4" | d.y == "5") {
                              return "#007844";
                          } else {
                              return "#000";
                          }
                      });

      }; // DrawMe end

          /***
          *     ___
          *    |  _|
          *    |_  | _
          *    |___||_|    Run code and return visualization (D3) object
          */

    drawMe();
    } // link end

  }; // directiveDefinitionObject end
  return directiveDefinitionObject;
}); //End Directive
//=============================================
//***************
//***********
//*****

/***
 *    ██████╗ ██╗   ██╗██╗     ██╗     ███████╗████████╗     ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗
 *    ██╔══██╗██║   ██║██║     ██║     ██╔════╝╚══██╔══╝    ██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝
 *    ██████╔╝██║   ██║██║     ██║     █████╗     ██║       ██║     ███████║███████║██████╔╝   ██║
 *    ██╔══██╗██║   ██║██║     ██║     ██╔══╝     ██║       ██║     ██╔══██║██╔══██║██╔══██╗   ██║
 *    ██████╔╝╚██████╔╝███████╗███████╗███████╗   ██║       ╚██████╗██║  ██║██║  ██║██║  ██║   ██║
 *    ╚═════╝  ╚═════╝ ╚══════╝╚══════╝╚══════╝   ╚═╝        ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
 *      ____   _                   _    _
 *     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
 *     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
 *     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
 *     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
 *
 *    This directive renders a bullet chart.
 */

PARTICLE.directive('bulletChart', function ($parse, $window, $timeout) {
    //explicitly creating a directive definition variable
    //this may look verbose but is good for clarification purposes
    //in real life you'd want to simply return the object {...}
    var directiveDefinitionObject = {
        //We restrict its use to an element
        //as usually  <bars-chart> is semantically
        //more understandable
        restrict: 'E',
        //this is important,
        //we don't want to overwrite our directive declaration
        //in the HTML mark-up
        replace: true,
        //our data source would be an array
        //passed thru chart-data attribute
      scope: {
        member: '=',
        target: "=",
        rangestart: "=",
        rangeend: "=",
        current: "=",
        colors: "=",
        ratio: "=",
        delay: "=",
        alttext:"="
      },
        link: function (scope, element, attrs) {
          //in D3, any selection[0] contains the group
          //selection[0][0] is the DOM node
          //but we won't need that this time
          //a little of magic: setting it's width based
          //on the data value (d)
          //and text all with a smooth transition

          //---------------------------------------

          //console.log(attrs)
          //console.log(scope.member.graph);
          var drawn = 0;
          var margin = {top: 20, right: 0, bottom: 30, left: 40}, width, height;
          var drawDelay = 250;
          width = element.parent().innerWidth() * 0.98;
          height = element.parent().innerHeight();//$window.innerHeight * .75 - margin.top - margin.bottom;
          if (width<150) width = 205;
          if (height <= width ){  height = width;}
          height = width;

          // var unregister = scope.$watch(
          // function() { return element.parent().parent().parent().is(":visible"); },
          // function() {
          //   $timeout(function() {
          //
          //               if (element.parent().height()) {
          //                 //width = 300;//.6*element.parent().innerWidth(),
          //                 //height = 300;//.6*element.parent().innerHeight();//$window.innerHeight * .75 - margin.top - margin.bottom;
          //
          //                 if(drawn===0){drawMe(width,height);drawn=1;
          //                 }
          //               }
          //           }, 0);
          //
          //
          // });

   $timeout(function() {
       if (element.parent().height()) {
         if(drawn===0){drawMe(width,height);drawn=1;
         }
       }
   }, 5000 + scope.delay * drawDelay );

        scope.rangestart = scope.rangestart || 0;


        var plainTextFromHTML =  function(text) {
          return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
        };


        var drawMe = function(width,height) {

          if (scope.rangestart < scope.rangeend) {
            if(scope.current > scope.rangeend) {
              scope.current = scope.rangeend;
            }
          } else {
            if(scope.current < scope.rangeend) {
              scope.current = scope.rangeend;
            }
          }

          var w = width,
              h = height,
              ah = h / scope.ratio;

          var margins = {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            texmargin:15
          },
          legendPanel = {
            width: 0
          },

          dataset = [
          {
            name: 'x',
            data: [{
              month: 'x',
              count: scope.rangeend,
              start:50
            }]
          },
          {
            name: 'y',
            data: [{
              month: 'y',
              count: scope.current,
              start:0
            }]
          },
          // {
 //            name: 'z',
 //            data: [{
 //              month: 'z',
 //              count: scope.rangeend * .6,
 //              start:22
 //            }]
 //          }
          ],
          series = dataset.map(function (d) {
            return d.name;
          });
          dataset = dataset.map(function (d) {
            return d.data.map(function (o, i) {
              // Structure it so that your numeric
              // axis (the stacked amount) is y
              return {
                y: o.count,
                x: o.month,
                s: o.start
              };
            });
          });
          stack = d3.layout.stack();

          stack(dataset);

          dataset = dataset.map(function (group) {
            return group.map(function (d) {
              // Invert the x and y values, and y0 becomes x0
              console.log("dataset.map",d);
              return {
                x: d.y,
                y: d.x,
                x0: d.y0,
                start:d.s
              };
            });
          });


          //console.log("scope.target",scope.target,"scope.rangestart",scope.rangestart,"scope.rangeend",scope.rangeend)
            var svg = d3.select(element[0])
              .append('svg')
              .attr("viewBox", "0 0 " + w + " " + ah + "")
              .attr("preserveAspectRatio", "xMinYMin meet")
              .append('g')
              .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')
              .attr('alt',plainTextFromHTML(scope.alttext)),
            xMax = d3.max(dataset, function (group) {
              return d3.max(group, function (d) {
                return d.x + d.x0;
              });
            });

           console.log("[scope.rangestart, width*.9]",[scope.rangestart, width * 0.9]);

            var xScale = d3.scale.linear()
              .domain([scope.rangestart, scope.rangeend])
              .range([scope.rangestart, width * 0.9]);

            var xScaleRev = d3.scale.linear()
              .domain([scope.rangeend, scope.rangestart])
              .range([scope.rangestart, width * 0.9]);

            var months = dataset[0].map(function (d) {
              return d.y;
            }),
            yScale = d3.scale.ordinal()
              .domain(months)
              .rangeRoundBands([0, height], 0.5);

            var xAxis = d3.svg.axis()
              .scale(xScale)
              .ticks(7)
              .innerTickSize(-ah);

            var xAxisRev = d3.svg.axis()
              .scale(xScaleRev)
              .ticks(7)
              .innerTickSize(-ah),

            //var colours = d3.scale.category10()

            groups = svg.selectAll('g')
              .data(dataset)
              .enter()
              .append('g')
              .attr('class', function (d, i) {
                return  "bg-" + scope.colors[i];
              }),

            rects = groups.selectAll()
              .data(function (d) {
                return d;
              })
              .enter()
              .append('rect')
              .attr('x', 1.5*margins.texmargin)
              .attr('y', 2 *margins.texmargin)
              .attr('height', ah - 2 * margins.texmargin)
              .attr('width', function (d) {
                return xScale(d.x);
              }),

            triangles = groups.selectAll('rect');


            console.log("scope.rangeend = " + scope.rangeend +" - scope.target = "+ scope.target ,Math.abs(scope.rangeend - scope.target));
            var successBarWidth = 3;
            if (scope.rangeend != scope.target) {
              successBarWidth = Math.abs(xScale(scope.target) - xScale(scope.rangeend));
            } {
              //successBarWidth = Math.abs(xScale(scope.target) - xScale(scope.rangeend))
              //scope.target = scope.target * .97
              Math.abs(xScale(scope.target) - xScale(scope.target * 0.97));
            }



            var bar = svg.append('g');
            bar.append('rect')
            .attr('width', successBarWidth )
            .attr('height', ah)
            .attr('x', xScale(scope.target) + 1.5*margins.texmargin)
            .attr('y', 0)
            .attr('id',"MU MU ZIPO ZIPO")
            .attr('class',"bg-lillypad-0-fade-6");

            // .each(function(d) {
            //   var lb = xScale(d.x) - 5,
            //       mb = xScale(d.x),
            //       rb = xScale(d.x) + 5,
            //       pointsTop = lb + ",0 " + rb + ",0 " + mb + ",10",
            //       pointsBot = lb + "," + ah + " " + rb + "," + ah + " " + mb + "," + (ah - 10),
            //       old_rect = this.outerHTML,
            //       new_rect = '<g>' + old_rect + '<polygon points="' + pointsTop + '"/><polygon points="' + pointsBot + '"/><line x1="' + xScale(d.x) + '" y1="0" x2="' + xScale(d.x) + '" y2="' + ah + '"/></g>';
            //   $(this).parent().html(new_rect);
            //   return;
            // });
            //

          svg.append('g')
            .attr('class', 'axis color-white')
            .call(xAxis);

          svg.selectAll(".axis line")
            .attr("transform", function(d) {
               return "translate("+ 1.5 * margins.texmargin +"," + (ah+1.75*margins.texmargin) + ")";
           });

          svg.selectAll(".axis text")
            .attr("transform", function(d) {
               return "translate(" + 1.5 * margins.texmargin + "," + margins.texmargin/2 + ")rotate(0)";
           });

        };
      }
     };
     return directiveDefinitionObject;
  });

/***
 *     ██████╗ ██████╗ ██╗     ██╗     ███████╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗
 *    ██╔════╝██╔═══██╗██║     ██║     ██╔════╝██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
 *    ██║     ██║   ██║██║     ██║     █████╗  ██║        ██║   ██║██║   ██║██╔██╗ ██║
 *    ██║     ██║   ██║██║     ██║     ██╔══╝  ██║        ██║   ██║██║   ██║██║╚██╗██║
 *    ╚██████╗╚██████╔╝███████╗███████╗███████╗╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
 *     ╚═════╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
 *    ███╗   ███╗███████╗███╗   ███╗██████╗ ███████╗██████╗ ███████╗
 *    ████╗ ████║██╔════╝████╗ ████║██╔══██╗██╔════╝██╔══██╗██╔════╝
 *    ██╔████╔██║█████╗  ██╔████╔██║██████╔╝█████╗  ██████╔╝███████╗
 *    ██║╚██╔╝██║██╔══╝  ██║╚██╔╝██║██╔══██╗██╔══╝  ██╔══██╗╚════██║
 *    ██║ ╚═╝ ██║███████╗██║ ╚═╝ ██║██████╔╝███████╗██║  ██║███████║
 *    ╚═╝     ╚═╝╚══════╝╚═╝     ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝
 *      ____   _                   _    _
 *     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___  ___
 *     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \/ __|
 *     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/\__ \
 *     |____/ |_||_|   \___| \___| \__||_|  \_/  \___||___/
 *
 *    These directives render various structural components of the page,
 *    based on information in the UI object returned by the data source.
 */

PARTICLE.directive('foo', function ($timeout) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            typeclass: "=",
            message: "="
        },
        template: '<div class="{{typeclass}}"></div>',
        link: function (scope, element, attrs) {
        }
    };
});

PARTICLE.directive("vBlock", function() {
    return {
        templateUrl: "/directives/value_block.html",
        transclude:true,
        scope: {
            lab: "=?",
            value: "=?",
            units: "=?",
            pack: "=?",
            assignto: "=?",
            unitcolor: "=?",
            bgcolor: "=?",
            labelwidth: "=?",
            valuewidth: "=?"
        },
        link: function(scope, element, attrs, ctrl, transclude) {
            scope.controlClick = function(evt,obj) {
                scope.isActive = !scope.isActive;
            };
        }
    };
});

PARTICLE.directive("invHeaderBlock", function() {
    return {
        templateUrl: "/directives/inv_header_block.html",
        transclude:true,
        scope: {
            label:"=?",
            value:"=?",
            fade: "=?",
            lgsize: "=?",
            color: "=?",
            labelcolor: "=?"
        }
    };
});

PARTICLE.directive("projectAlert", function() {
    return {
        templateUrl: "/directives/project_alert.html",
        transclude:true,
        scope: {
            label:"=?",
            value:"=?",
            units: "=?",
            flag: "=?"
        }
    };
});

PARTICLE.directive("uiPod", function() {
    return {
        template: "",
        transclude:true,
        scope: {
            pack: "=",
            assignto:"=",
            ui: "="
        },
        link: function(scope, element, attrs, ctrl, transclude) {
            scope[scope.assignto] = scope.pack;
            //scope.isActive = true;
            scope.controlClick = function(evt,obj) {
                scope.isActive = !scope.isActive;
            };
            transclude(scope.$new(),function(clone,scope) {
                element.append(clone);
            });
        }
    };
});

PARTICLE.directive('collection', function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            collection: '=',
            requirements: "=",
            toggle: '&',
            myData: '&'
        },
        template: "<div class='row flex'><member ng-repeat='widget in collection' requirements='requirements' member='widget'></member></div>",
    };
});

PARTICLE.directive('member', function ($compile, $rootScope, $timeout) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            member: '=',
            requirements: "="
        },
        templateUrl: "directives/item-block.html",
        link: function (scope, element, attrs) {
            var collectionSt = '<collection collection="member.widgets"></collection>';
            scope.$on("message", function (e, msg) {

                // If I am messaged then I need to toggle myself
                if (msg[0] == scope.member.id_class) {
                    scope.member.toggle = !scope.member.toggle;
                }

                // Futher I also need to turn off all those in my group
                if (msg[1] == scope.member.group_class && msg[0] != scope.member.id_class) {
                    scope.member.toggle = 0;
                }

            });

            if (angular.isArray(scope.member.widgets)) {
                $compile(collectionSt)(scope, function (cloned, scope) {
                    element.append(cloned);
                });
            }
        },
        controller: function ($scope) {

            var initial_state = $scope.member.toggle;
            $scope.member.toggle = 1;

            $timeout(function () {
                $scope.member.toggle = initial_state;
            }, 100);

            $scope.f = function (id) {
                if (this.member.disable_hide_show !== true) {
                    if (this.member.hides) {
                        $rootScope.$broadcast('message', [id, this.member.hides]);
                    } else {
                        $rootScope.$broadcast('message', [id, "LACKAHIDES"]);
                    }
                }
            };

        }

    };
});
/***
 *    ██████╗ ██╗███████╗     ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗
 *    ██╔══██╗██║██╔════╝    ██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝
 *    ██████╔╝██║█████╗      ██║     ███████║███████║██████╔╝   ██║
 *    ██╔═══╝ ██║██╔══╝      ██║     ██╔══██║██╔══██║██╔══██╗   ██║
 *    ██║     ██║███████╗    ╚██████╗██║  ██║██║  ██║██║  ██║   ██║
 *    ╚═╝     ╚═╝╚══════╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
 *      ____   _                   _    _
 *     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
 *     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
 *     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
 *     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
 *
 *    This directive renders a donut chart.
 */

PARTICLE.directive('donutChart', function ($parse, $window, $timeout) {
    //explicitly creating a directive definition variable
    //this may look verbose but is good for clarification purposes
    //in real life you'd want to simply return the object {...}
    var directiveDefinitionObject = {
        //We restrict its use to an element
        //as usually  <bars-chart> is semantically
        //more understandable
        restrict: 'E',
        //this is important,
        //we don't want to overwrite our directive declaration
        //in the HTML mark-up
        replace: false,
        //our data source would be an array
        //passed thru chart-data attribute
        scope: {data: '=chartData', whoamiin: '=whoamiin', member: '=member'},
        link: function (scope, element, attrs) {
            //in D3, any selection[0] contains the group
            //selection[0][0] is the DOM node
            //but we won't need that this time
            //a little of magic: setting it's width based
            //on the data value (d)
            //and text all with a smooth transition

            //---------------------------------------

            //console.log(attrs)
            //console.log(scope.member);
            var drawn = 0;
            var margin = {top: 20, right: 0, bottom: 30, left: 40}, width, height;
            width = element.parent().innerWidth() * 0.98;
            height = element.parent().innerHeight();//$window.innerHeight * 0.75 - margin.top - margin.bottom;
            if (width < 150) width = 205;
            if (height <= width) {
                height = width;
            }
            height = width;
            //console.log("progressMeter",width,height);

            var unregister = scope.$watch(
                function () {
                    return element.parent().parent().parent().is(":visible");
                },
                function () {
                    $timeout(function () {

                        if (element.parent().height()) {
                            //width = 300;//.6*element.parent().innerWidth(),
                            //height = 300;//.6*element.parent().innerHeight();//$window.innerHeight * .75 - margin.top - margin.bottom;

                            if (drawn === 0) {
                                drawMe();
                                drawn = 1;
                            }
                        }
                    }, 0);


                });


            var drawMe = function () {

                var dataset = [100, 90, 80, 70, 60, 50];
                var radius = Math.min(width, height) / 2;

                var w = width,
                    h = height,
                    tw = ( w / 2 ) * ( w / h ),
                    th = ( h / 2 );

                var svg = d3.select(element[0])
                    .append("svg")
                    .attr("viewBox", "0 0 " + ( tw * 2 ) + " " + ( th * 2 ) + "")
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .append("g")
                    .attr("transform", "translate(" + tw + "," + th + ")");
                var color = d3.scale.ordinal()
                    .range(["#009DD9", "#FF8300", "#B21DAC", "#D70036", "#707276", "#000000"]);
                var pie = d3.layout.pie()
                    .sort(null);
                var arc = d3.svg.arc()
                    .innerRadius(( width / 2 ) - ( width / 4 ))
                    .outerRadius(( width / 2 ));
                var path = svg.selectAll("path")
                    .data(pie(dataset))
                    .enter().append("path")
                    .attr("fill", function (d, i) {
                        return color(i);
                    })
                    .attr("d", arc)
                    .attr('class', function (d, i) {
                        return 'fill-color-' + i;
                    })
                    .each(function (d) {
                        this._current = d;
                    }); // store the initial values
                function change(newdata) {
                    path = path.data(pie(newdata)); // update the data
                    path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
                }

                // Store the displayed angles in _current.
                // Then, interpolate from _current to the new angles.
                // During the transition, _current is updated in-place by d3.interpolate.
                function arcTween(a) {
                    var i = d3.interpolate(this._current, a);
                    this._current = i(0);
                    return function (t) {
                        return arc(i(t));
                    };
                }

            };
        }
    };
    return directiveDefinitionObject;
});

/***
 *    ███████╗██╗██╗     ██╗          ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗
 *    ██╔════╝██║██║     ██║         ██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝
 *    █████╗  ██║██║     ██║         ██║     ███████║███████║██████╔╝   ██║
 *    ██╔══╝  ██║██║     ██║         ██║     ██╔══██║██╔══██║██╔══██╗   ██║
 *    ██║     ██║███████╗███████╗    ╚██████╗██║  ██║██║  ██║██║  ██║   ██║
 *    ╚═╝     ╚═╝╚══════╝╚══════╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
 *      ____   _                   _    _
 *     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
 *     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
 *     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
 *     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
 *
 *    This directive renders a fill chart.
 */

PARTICLE.directive('fillChart', function ($parse, $window, $timeout) {
    //explicitly creating a directive definition variable
    //this may look verbose but is good for clarification purposes
    //in real life you'd want to simply return the object {...}
    var directiveDefinitionObject = {
        //We restrict its use to an element
        //as usually  <bars-chart> is semantically
        //more understandable
        restrict: 'E',
        //this is important,
        //we don't want to overwrite our directive declaration
        //in the HTML mark-up
        replace: false,
        //our data source would be an array
        //passed thru chart-data attribute
        scope: {
            data: '=chartData',
            whoamiin: '=whoamiin',
            member: '=member',
            elementid: "=elementid"
        },
        link: function (scope, element, attrs) {
            //in D3, any selection[0] contains the group
            //selection[0][0] is the DOM node
            //but we won't need that this time
            //a little of magic: setting it's width based
            //on the data value (d)
            //and text all with a smooth transition

            //---------------------------------------

            //console.log(attrs)
            //console.log(scope.member.graph);
            var drawn = 0;
            var margin = {top: 20, right: 0, bottom: 30, left: 40}, width, height;
            width = element.parent().innerWidth() * 0.98;
            height = element.parent().innerHeight();//$window.innerHeight * .75 - margin.top - margin.bottom;
            if (width < 150) width = 205;
            if (height <= width) {
                height = width;
            }
            height = width;

            var unregister = scope.$watch(
                function () {
                    return element.parent().parent().parent().is(":visible");
                },
                function () {
                    $timeout(function () {

                        if (element.parent().height()) {
                            //width = 300;//.6*element.parent().innerWidth(),
                            //height = 300;//.6*element.parent().innerHeight();//$window.innerHeight * .75 - margin.top - margin.bottom;

                            if (drawn === 0) {
                                drawMe();
                                drawn = 1;
                            }
                        }
                    }, 0);


                });


            var drawMe = function () {

                var w = width,
                    h = height,
                    tw = ( w / 2 ) * ( w / h ),
                    th = ( h / 2 ),
                    el = scope.elementid;

                d3.select(element[0])
                    .append("svg")
                    .attr("viewBox", "0 0 " + ( tw * 2.05 ) + " " + ( th * 2.05 ) + "")
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("id", el);

                var gauge2 = loadLiquidFillGauge(el, 70);
                var config2 = liquidFillGaugeDefaultSettings();

                function NewValue() {
                    if (Math.random() > 0.5) {
                        return Math.round(Math.random() * 100);
                    } else {
                        return (Math.random() * 100).toFixed(1);
                    }
                }

            };
        }
    };
    return directiveDefinitionObject;
});

/***
 *    ██╗████████╗███████╗███╗   ███╗    ██████╗ ██╗      ██████╗  ██████╗██╗  ██╗
 *    ██║╚══██╔══╝██╔════╝████╗ ████║    ██╔══██╗██║     ██╔═══██╗██╔════╝██║ ██╔╝
 *    ██║   ██║   █████╗  ██╔████╔██║    ██████╔╝██║     ██║   ██║██║     █████╔╝
 *    ██║   ██║   ██╔══╝  ██║╚██╔╝██║    ██╔══██╗██║     ██║   ██║██║     ██╔═██╗
 *    ██║   ██║   ███████╗██║ ╚═╝ ██║    ██████╔╝███████╗╚██████╔╝╚██████╗██║  ██╗
 *    ╚═╝   ╚═╝   ╚══════╝╚═╝     ╚═╝    ╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝
 *      ____   _                   _    _
 *     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
 *     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
 *     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
 *     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
 *
 *    This directive renders a structural component of the page, based on information
 *    in the UI object returned by the data source.
 */

PARTICLE.directive('itemBlock', function ($compile, $rootScope, $timeout) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            member: '=',
        },
        templateUrl: "/directives/iblock.html",
        link: function (scope, element, attrs) {

            scope.$watch(attrs.member, function () {
                //check new value to be what you expect.
                if (scope.member !== undefined) {
                    console.log("WATCH Fired", scope.member);
                }

            });

            var collectionSt = '<collection collection="member.widgets"></collection>';
            scope.$on("message", function (e, msg) {

                // If I am messaged then I need to toggle myself
                if (msg[0] == scope.member.id_class) {
                    scope.member.toggle = !scope.member.toggle;
                }

                // Futher I also need to turn off all those in my group
                if (msg[1] == scope.member.group_class && msg[0] != scope.member.id_class) {
                    scope.member.toggle = 0;
                }

            });
            if (!scope.member) {
                // console.log("NOT DEFINED");
            } else if (angular.isArray(scope.member.widgets)) {
                $compile(collectionSt)(scope, function (cloned, scope) {
                    element.append(cloned);
                });
            }
        },
        controller: function ($scope) {

            if ($scope.member !== undefined) {
                var initial_state = $scope.member.toggle;
                $scope.member.toggle = 1;

                $timeout(function () {
                    $scope.member.toggle = initial_state;
                }, 100);
            }


            $scope.f = function (id) {
                if (this.member.disable_hide_show !== true) {
                    if (this.member.hides) {
                        $rootScope.$broadcast('message', [id, this.member.hides]);
                    } else {
                        $rootScope.$broadcast('message', [id, "LACKAHIDES"]);
                    }
                }
            };

        }

    };
});

/***
* ███╗   ███╗██╗   ██╗██╗  ████████╗██╗██████╗ ██╗     ███████╗    ████████╗██╗███╗   ███╗███████╗██╗     ██╗███╗   ██╗███████╗
* ████╗ ████║██║   ██║██║  ╚══██╔══╝██║██╔══██╗██║     ██╔════╝    ╚══██╔══╝██║████╗ ████║██╔════╝██║     ██║████╗  ██║██╔════╝
* ██╔████╔██║██║   ██║██║     ██║   ██║██████╔╝██║     █████╗         ██║   ██║██╔████╔██║█████╗  ██║     ██║██╔██╗ ██║█████╗
* ██║╚██╔╝██║██║   ██║██║     ██║   ██║██╔═══╝ ██║     ██╔══╝         ██║   ██║██║╚██╔╝██║██╔══╝  ██║     ██║██║╚██╗██║██╔══╝
* ██║ ╚═╝ ██║╚██████╔╝███████╗██║   ██║██║     ███████╗███████╗       ██║   ██║██║ ╚═╝ ██║███████╗███████╗██║██║ ╚████║███████╗
* ╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝   ╚═╝╚═╝     ╚══════╝╚══════╝       ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝╚═╝╚═╝  ╚═══╝╚══════╝
*
*      ____   _                   _    _
*     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
*     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
*     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
*     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
*
*    This directive renders a trend chart.
*/

PARTICLE.directive('multipleTimeline', function ($parse, $window, $timeout) {

  /* Usage:
    1. <needle-chart></needle-chart> is semantically

    Attr Params:
      1. config
      2. datasets*/

    var directiveDefinitionObject = {
        //Restrict use to an element
        restrict: 'E',
        //Do NOT overwrite our directive declaration in the HTML mark-up
        replace: false,
        //Chart data and config passed thru attributes
        scope: {
            config: '=',
            datasets: "=",
            colors: "=",
            max:"=",
            min:"=",
            mockup:"=",
            index:"="
        },

    link: function (scope, element, attrs) {
        var drawn = 0;

    $timeout(function() {
        if (element.parent().height()) {
            if(drawn===0){
                drawMe(scope.index);
                drawn=1;
            }
        }
    },
    1);

    var drawMe = function(index) {
        var width, height, dataset, layers, chart;

        /***
        *    DEFAULT
        *          _                          _              _    _    _
        *     ___ |_| ___  ___    ___  ___  _| |   ___  ___ | |_ | |_ |_| ___  ___  ___
        *    |_ -|| ||- _|| -_|  | .'||   || . |  |_ -|| -_||  _||  _|| ||   || . ||_ -|
        *    |___||_||___||___|  |__,||_|_||___|  |___||___||_|  |_|  |_||_|_||_  ||___|
        *                                                                     |___|
        *
        *
        *        chartInset  :: istance from the edge of the drawn SVG
        *        margin      :: standard top, right...... in pixels - no being used at moment....
        *        barWidth    :: thickness/width of bar in pixels, might make this a percent in the future...
        *        successIndicatorDegWidth      :: the number of degrees the success indicator should span from its start point
        *                                      :: set to 0 to make it go to the very end of the chart
        *
        ***/
          var config = {
              chartInset:0,
              hasSuccessIndicator:true,
              hasBandIndicator:false,
              margin: {
                  top: 20,
                  right: 80,
                  bottom: 40,
                  left: 90
              },
              barWidth:10,
              widthPercentSize:1.1,
              needLength:1,
              colors: {
                  primary_fill: "color-pewter",
                  color_2: "boldorange-0-fade-1",
                  success: "color-bluepuddy-0-fade-5",
                  needle: "color-pewter-0-fade-0",
                  bg: "color-white-6-fade-8",
                  legend:"color-bluepuddy-8-fade-0"
              },
              max:100,
              min:0
          }; // End config

          /***
          *                                     _                _       ___            _  _
          *     ___  _ _  ___  ___  _ _ _  ___ |_|| |_  ___    _| | ___ |  _| ___  _ _ | || |_  ___
          *    | . || | || -_||  _|| | | ||  _|| ||  _|| -_|  | . || -_||  _|| .'|| | || ||  _||_ -|
          *    |___| \_/ |___||_|  |_____||_|  |_||_|  |___|  |___||___||_|  |__,||___||_||_|  |___|
          *
          */

          if (scope.config !== undefined){
              Object.keys(scope.config).forEach(function(key,index) {
                  config[key] = scope.config[key];
              });
          }

          /***
          *                 _                                         _
          *     _____  ___ |_| ___    ___  ___  ___  ___  ___  ___  _| | _ _  ___  ___
          *    |     || .'|| ||   |  | . ||  _|| . ||  _|| -_|| -_|| . || | ||  _|| -_|
          *    |_|_|_||__,||_||_|_|  |  _||_|  |___||___||___||___||___||___||_|  |___|
          *                          |_|
          */

          /***
          *
          *     ___
          *    |_  |
          *     _| |_  _
          *    |_____||_|   Select the directive element to push our SVG into:
          *
          */

          el = d3.select(element[0]);

          /***
          *
          *     ___
          *    |_  |
          *    |  _| _     Calculate the width of the width and height of the chart
          *    |___||_|    Height is fixed to 400, width varies with parent element width
          *
          */

          width = element[0].parentElement.clientWidth;
          height = 275;

          /***
          *     ___
          *    |_  |
          *    |_  | _
          *    |___||_|    Prepare dataset to be used by D3
          *                Update this section to match updated dataset
          */

          dataset = scope.datasets;
          dataset.forEach(function(d){
              d.date = new Date(d.date);
          });

          var color = d3.scale.category10();
          color.domain(d3.keys(dataset[0]).filter(function(key) { return key !== "date"; }));

          /***
          *     ___
          *    | | |
          *    |_  | _
          *      |_||_|    Create Chart Objects: X/Y Scales, Primary Chart Object,
          *                X/Y Axes, and Data Bars.
          */

          // Define X Scale
          var xScale = d3.time.scale()
              .domain([new Date(2015, 05, 31), new Date(2016, 07, 01)]) //d3.extent(dataset, function(d) { return d.date; })
              .range([0 + config.margin.left, width - config.margin.right]);

          // Define Y Scale
          var fields = ["replan", "correction", "rebaseline"];
          var yScale = d3.scale.ordinal()
              .domain(fields)
              .rangePoints([height-config.margin.bottom, config.margin.top]);

          var xticks = dataset.length;

          chart = el.append("svg")
              .attr("viewBox", "0 0 " + width + " " + height + "")
              .attr("preserveAspectRatio", "xMinYMin slice")
              .attr("height",height)
              .attr("width",width);

          /*chart = el.append("svg")
              .attr("viewBox", "0 0 " + width + " " + height + "")
              .attr("preserveAspectRatio", "xMinYMin slice")
              .attr("class", "chart")
              .append('g')
              .attr("height",height)
              .attr("width",width);*/

          var xAxis = d3.svg.axis()
              .scale(xScale)
              .orient("bottom")
              .innerTickSize(-height + config.margin.top + config.margin.bottom)
              .outerTickSize(0)
              .tickPadding(20);

          var yAxis = d3.svg.axis()
              .scale(yScale)
              .orient("left")
              .ticks(fields.length)
              .innerTickSize(-width + config.margin.left + config.margin.right)
              .outerTickSize(0)
              .tickPadding(20);

          var x_axis = chart.append("g") // Draw axes: x axis
              .attr("id","xaxis")
              .attr("class", "color-white-0")
              .attr("transform","translate(0, " + (height - config.margin.bottom) + ")")
              .call(xAxis)
                  .selectAll("text")
                  .style("text-anchor", "middle")
                  .attr("dy", "10px")
                  .style("font-weight", function(d) {
                      if(d.getMonth() === 0){
                          return "bold";
                      }
                  });

          var y_axis = chart.append("g") // Draw axes: y axis
              .attr("id","yaxis")
              .attr("class", "color-white-0")
              .attr("transform","translate(" + config.margin.left + ",0)")
              .call(yAxis)
                  .selectAll("text")
                  .style("text-anchor", "end")
                  .text(function(d) {
                      return d.charAt(0).toUpperCase() + d.slice(1);
                  });

          var point = chart.append("g")
                .attr("class", "line-point");

          point.selectAll('circle')
              .data(dataset)
              .enter()
              .append('circle')
                .attr("cx", function(d) { return xScale(d.date); })
                .attr("cy", function(d) { return yScale(d.type); })
                .attr("r", 10)
                .attr("class", "color-white-0-fade-5")
                .style("stroke", function(d) { return color(d.type); })
                .style("stroke-width", "4px");

      }; // DrawMe end

          /***
          *     ___
          *    |  _|
          *    |_  | _
          *    |___||_|    Run code and return visualization (D3) object
          */

    } // link end

  }; // directiveDefinitionObject end
  return directiveDefinitionObject;
}); //End Directive
/***
 *    ███╗   ██╗███████╗███████╗██████╗ ██╗     ███████╗     ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗
 *    ████╗  ██║██╔════╝██╔════╝██╔══██╗██║     ██╔════╝    ██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝
 *    ██╔██╗ ██║█████╗  █████╗  ██║  ██║██║     █████╗      ██║     ███████║███████║██████╔╝   ██║
 *    ██║╚██╗██║██╔══╝  ██╔══╝  ██║  ██║██║     ██╔══╝      ██║     ██╔══██║██╔══██║██╔══██╗   ██║
 *    ██║ ╚████║███████╗███████╗██████╔╝███████╗███████╗    ╚██████╗██║  ██║██║  ██║██║  ██║   ██║
 *    ╚═╝  ╚═══╝╚══════╝╚══════╝╚═════╝ ╚══════╝╚══════╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
 *      ____   _                   _    _
 *     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
 *     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
 *     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
 *     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
 *
 *    This directive renders a needle chart.
 */

PARTICLE.directive('needleChart', function ($parse,$window,$timeout) {

  /* Usage:
    1. <needle-chart></needle-chart> is semantically

    Attr Params:
      1. config
      2. datasets
  */

  var directiveDefinitionObject = {

    //Restrict use to an element
    restrict: 'E',
    //Do NOT overwrite our directive declaration in the HTML mark-up
    replace: false,
    //Chart data and config passed thru attributes
    scope: {
      config: '=',
      datasets: "=",
      colors: "=",
      percentcomplete: "=",
      successpercent: "=",
      max:"=",
      min:"=",
      mockup:"=",
      alttext:"="
    },
    link: function (scope, element, attrs) {

      var drawn = 0;

      $timeout(function() {
        if (element.parent().height()) {
          if(drawn===0){
            drawMe();
            drawn=1;
          }
        }
      }, 100);


      var plainTextFromHTML =  function(text) {
        return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
      };

      var drawMe = function() {

      var chart, degToRad, repaintGauge, success_per,
      height, margin, numSections, padRad, percToDeg, percToRad,
      percent, radius, sectionIndx, svg, totalPercent, width;


      //Set the percent for the CURRENT bale
      padRad = 0.025;

    /***
     *    DEFAULT
     *          _                          _              _    _    _
     *     ___ |_| ___  ___    ___  ___  _| |   ___  ___ | |_ | |_ |_| ___  ___  ___
     *    |_ -|| ||- _|| -_|  | .'||   || . |  |_ -|| -_||  _||  _|| ||   || . ||_ -|
     *    |___||_||___||___|  |__,||_|_||___|  |___||___||_|  |_|  |_||_|_||_  ||___|
     *                                                                     |___|
     *

              chartInset  :: istance from the edge of the drawn SVG
              margin      :: standard top, right...... in pixels - no being used at moment....
              barWidth    :: thickness/width of bar in pixels, might make this a percent in the future...
              successIndicatorDegWidth      :: the number of degrees the success indicator should span from its start point
                                            :: set to 0 to make it go to the very end of the chart

      **********************************************/
      var config = {
        chartInset:20,
        hasSuccessIndicator:true,
        hasBandIndicator:false,
        margin: {
          top: 0,
          right: 20,
          bottom: 0,
          left: 20
        },
        barWidth:100,
        widthPercentSize:1.1,
        successIndicatorDegWidth:0,
        startAngle:-110,
        endAngle:110,
        needLength:1,
        colors: {
          primary_fill: "color-pewter",
          color_2: "boldorange-0-fade-1",
          success: "color-bluepuddy-0-fade-5",
          needle: "color-pewter-0-fade-0",
          bg: "color-white-6-fade-8",
          legend:"color-bluepuddy-8-fade-0"
        },
        labelFormat          : d3.format(',g'),
        max:100,
        min:0,
        units:"%"
      };

    /***
     *
     *                                     _  _             _       ___            _  _
     *     ___  _ _  ___  ___  _ _ _  ___ |_|| |_  ___    _| | ___ |  _| ___  _ _ | || |_  ___
     *    | . || | || -_||  _|| | | ||  _|| ||  _|| -_|  | . || -_||  _|| .'|| | || ||  _||_ -|
     *    |___| \_/ |___||_|  |_____||_|  |_||_|  |___|  |___||___||_|  |__,||___||_||_|  |___|
     *
     */
      if (scope.config !== undefined){
        Object.keys(scope.config).forEach(function(key,index) {
             config[key] = scope.config[key];
        });
      }

      /***
       *
       *          _    _  _  _  _                       _    _           _
       *     _ _ | |_ |_|| ||_|| |_  _ _    _____  ___ | |_ | |_  ___  _| | ___
       *    | | ||  _|| || || ||  _|| | |  |     || -_||  _||   || . || . ||_ -|
       *    |___||_|  |_||_||_||_|  |_  |  |_|_|_||___||_|  |_|_||___||___||___|
       *                            |___|
       *
      **********************************************/
      percToDeg = function(perc) {
        //return perc * 360;
        return 360 - (totalAngle * perc + config.startAngle);
      };

      percToRad = function(perc) {
        return degToRad(percToDeg(perc));
      };

      degToRad = function(deg) {
        return deg * Math.PI / 180;
      };


      /***
       *
       *                 _                                         _
       *     _____  ___ |_| ___    ___  ___  ___  ___  ___  ___  _| | _ _  ___  ___
       *    |     || .'|| ||   |  | . ||  _|| . ||  _|| -_|| -_|| . || | ||  _|| -_|
       *    |_|_|_||__,||_||_|_|  |  _||_|  |___||___||___||___||___||___||_|  |___|
       *                          |_|
       */

      /***
       *
       *     ___
       *    |_  |
       *     _| |_  _
       *    |_____||_|   Select the directive element to push our SVG into:
       *
       */
      el = d3.select(element[0]);


      /***
       *
       *     ___
       *    |_  |
       *    |  _| _
       *    |___||_|    Calculate the width of the width, height and radius of the chart
       *
       */
      width = element.innerWidth();
      radius =width * 0.5 ;
			height = (radius + Math.sin(degToRad(config.endAngle-90))*radius) ;
      /***
       *
       *     ___
       *    |_  |
       *    |_  | _
       *    |___||_|    Create the primary SVG element,
       *                Set the preserveAspectRatio so it scales as the screen size changes
       *
       */
      console.log("config.widthPercentSize",config.widthPercentSize);
      svg = el.append('svg')
            .attr("viewBox", "0 0 " + ( width * config.widthPercentSize ) + " " + ( height * config.widthPercentSize ) + "")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .append("g").attr('transform', "translate(" + ( config.widthPercentSize  * (width)/2 ) + ", " + config.widthPercentSize * (width/2) + ")")
            .attr('width', width).attr('height', height)
            .attr('alt',plainTextFromHTML(scope.alttext));

      /***
       *
       *     ___
       *    | | |
       *    |_  | _
       *      |_||_|    Add layer for the gauge itself
       *                Also add the paths for the three archs
       *                NOTE: the additional identifying classes such as primary_band, bg_band and success_band
       *                Which are used to identify and select them later
       *
       */
      chart = svg.append('g');
      chart.append('path').attr('class', "arc " + config.colors.primary_fill + " primary_band" );
      chart.append('path').attr('class', "arc " + config.colors.success  + " success_band");
      chart.append('path').attr('class', "arc " + config.colors.bg  + " bg_band");

      function centerTranslation() {
        return 'translate('+radius/2 +','+ radius/2 +')';
      }
      var centerTx = centerTranslation();

      var scale = d3.scale.linear().range([0,1]).domain([config.min, config.max]);

  var range = config.endAngle - config.startAngle;
  var ticks = scale.ticks(9);

  var lg = svg.append('g').attr('class', 'color-white').attr('transform' , 'translate(0,0)');

      lg.selectAll('text')
      .data(ticks)
      .enter().append('text')
      .attr('transform', function(d) {

        var ratio = scale(d);
        var newAngle = degToRad(config.startAngle + (ratio * range));
        newAngle = degToRad(180 - (range * ratio + config.startAngle));

        var turnAngle = range * ratio;
        console.log(turnAngle,",turnAngle");

        var xpos = Math.sin(newAngle) * (radius + config.chartInset) ;//- ( Math.sin(newAngle) * config.chartInset);
        var ypos = Math.cos(newAngle) * (radius + config.chartInset);

        console.log("xpos,ypos", xpos, ypos);
        console.log("radius",radius);
        return 'rotate(' + 0 +') translate('+ (xpos -10) + "," + (ypos +5) +')';
        //return 'rotate(' + turnAngle +') translate('+ (-100) + "," + 100 +')';

      })
      .text(config.labelFormat);


      /***
       *
       *     ___
       *    |  _|
       *    |_  | _
       *    |___||_|    set the inner and outer radius of the arts, they are all the same at the moment.
       *
       */
      var arc_Background = d3.svg.arc().outerRadius(radius - config.chartInset).innerRadius(radius - config.chartInset - config.barWidth);
      var arc_Progress = d3.svg.arc().outerRadius(radius - config.chartInset).innerRadius(radius - config.chartInset - config.barWidth);
      var arc_Success = d3.svg.arc().outerRadius(radius - config.chartInset).innerRadius(0);

      /***
       *
       *     ___
       *    |  _|
       *    | . | _
       *    |___||_|    set the values for percent complete and the success point on the gauge.
       *                uses 25% if it undefined for mocking up interface
       *                uses 85% for default success unless
       *
       */

      if (config.max != 100 || config.min !== 0) {
        var gaugeRange;
        if (config.max > config.min) {
          gaugeRange = Math.abs(config.max - config.min);
          success_per = (scope.successpercent - config.min)/gaugeRange;
        } else {
          gaugeRange = Math.abs(config.min - config.max);
          success_per = (config.min-scope.successpercent)/gaugeRange;
        }
        percent =  scope.percentcomplete/100;

      } else {
        percent = scope.percentcomplete/100 ;
        if ( scope.successpercent == 100 ) {
          success_per = 0.99;
        } else {
          success_per = scope.successpercent/100;
        }
        percent = scope.percentcomplete/100;
      }

      if (percent > 1) { percent = 1; }


      /***
       *
       *     ___
       *    |_  |
       *      | | _
       *      |_||_|    Calulate the start and end Rads along with the total degress of the gauge
       *
       */
      var startAngleRad = degToRad(config.startAngle);
      var endAngleRad = degToRad(config.endAngle);
      var totalAngle = config.endAngle - config.startAngle;

     // percent = .75

      var perAngle = (totalAngle * percent + config.startAngle);
      var successAngle = (totalAngle * success_per + config.startAngle);

      var successAngleEnd;
      if (config.successIndicatorDegWidth !== undefined && config.successIndicatorDegWidth > 0) {
        successAngleEnd = (totalAngle * success_per + config.startAngle + config.successIndicatorDegWidth);
      } else {
        successAngleEnd = config.endAngle;
      }


      arc_Background.startAngle(degToRad(config.startAngle)).endAngle(endAngleRad);
      chart.select(".bg_band").attr('d', arc_Background);

      if (config.hasSuccessIndicator) {
        arc_Success.startAngle(degToRad(successAngle)).endAngle(degToRad(successAngleEnd));
        chart.select(".success_band").attr('d', arc_Success);
      }

      if (config.hasBandIndicator) {
        arc_Progress.startAngle(startAngleRad).endAngle(degToRad(perAngle));
        chart.select(".primary_band").attr('d', arc_Progress);
      }

      repaintGauge = function (perc)
      {

        //console.log("repaintGauge perc",perc)
        // //console.log("repaintGauge",perc)
 //        var next_start = totalPercent;
 //
 //        arcStartRad = percToRad(next_start);
 //        arcEndRad = arcStartRad + percToRad(perc / 2);
 //        next_start += perc / 2;
 //
 //
 //        arc_Progress.startAngle(arcStartRad).endAngle(arcEndRad);
 //
 //        arcStartRad = percToRad(next_start);
 //        arcEndRad = arcStartRad + percToRad((1 - perc) / 2);
 //
 //        arc_Background.startAngle(arcStartRad + padRad).endAngle(arcEndRad);
 //
 //
 //
 //
 //        chart.select(".primary_band").attr('d', arc_Progress);
 //        chart.select(".bg_band").attr('d', arc_Background);
 //

      };

      var needle;


      var Needle = (function() {

        /**
          * Helper function that returns the `d` value
          * for moving the needle
        **/
        var recalcPointerPos = function(perc) {
          var centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY;
          thetaRad = degToRad(360 - (totalAngle * perc + config.startAngle));
          //thetaRad = percToDeg()
          centerX = 0;
          centerY = 0;
          //console.log(Math.sin(Math.abs(startAngleRad)),"COS of startAngleRad" , startAngleRad)
          topX = centerX - this.len * Math.sin(thetaRad);
          topY = centerY - this.len * Math.cos(thetaRad);
          leftX = centerX - this.radius * Math.sin(thetaRad - Math.PI / 2);
          leftY = centerY - this.radius * Math.cos(thetaRad - Math.PI / 2);
          rightX = centerX - this.radius * Math.sin(thetaRad + Math.PI / 2);
          rightY = centerY - this.radius * Math.cos(thetaRad + Math.PI / 2);
          return "M " + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX + " " + rightY;
        };

        function Needle(el) {
          this.el = el;
          this.len = radius * config.needLength - config.barWidth * 0.5 ;
          this.radius = this.len * 0.2;
        }

        Needle.prototype.render = function() {
          this.el.append('circle').attr('class', 'needle-center ' + config.colors.needle).attr('cx', 0).attr('cy', 0).attr('r', this.radius);
          return this.el.append('path').attr('class', 'needle ' + config.colors.needle).attr('d', recalcPointerPos.call(this, 0));
        };

        Needle.prototype.moveTo = function(perc) {
          var self,
              oldValue = this.perc || 0;
              this.perc = perc;
              self = this;

          // Reset pointer position
          this.el.transition().delay(100).ease('quad').duration(500).select('.needle').tween('reset-progress', function() {
            return function(percentOfPercent) {
              var progress = (1 - percentOfPercent) * oldValue;
              repaintGauge(progress);
              return d3.select(this).attr('d', recalcPointerPos.call(self, progress));
            };
          });

          this.el.transition().delay(300).ease('bounce').duration(1500).select('.needle').tween('progress', function() {
            return function(percentOfPercent) {
              var progress = percentOfPercent * perc;

              repaintGauge(progress);
              return d3.select(this).attr('d', recalcPointerPos.call(self, progress));
            };
          });

        };



          return Needle;

      })();

      needle = new Needle(chart);
      needle.render();

      console.log("Org Percent",percent);
      needle.moveTo(percent);


      };
    }
  };
  return directiveDefinitionObject;
});
/***
 *    ██████╗ ██╗███████╗     ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗
 *    ██╔══██╗██║██╔════╝    ██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝
 *    ██████╔╝██║█████╗      ██║     ███████║███████║██████╔╝   ██║
 *    ██╔═══╝ ██║██╔══╝      ██║     ██╔══██║██╔══██║██╔══██╗   ██║
 *    ██║     ██║███████╗    ╚██████╗██║  ██║██║  ██║██║  ██║   ██║
 *    ╚═╝     ╚═╝╚══════╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
 *    ██╗      █████╗ ██████╗ ███████╗██╗
 *    ██║     ██╔══██╗██╔══██╗██╔════╝██║
 *    ██║     ███████║██████╔╝█████╗  ██║
 *    ██║     ██╔══██║██╔══██╗██╔══╝  ██║
 *    ███████╗██║  ██║██████╔╝███████╗███████╗
 *    ╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝
 *      ____   _                   _    _
 *     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
 *     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
 *     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
 *     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
 *
 *    This directive renders the labels for a pie chart.
 */

PARTICLE.directive('pieChartLabel', function ($parse, $window, $timeout) {
    //explicitly creating a directive definition variable
    //this may look verbose but is good for clarification purposes
    //in real life you'd want to simply return the object {...}
    var directiveDefinitionObject = {
        //We restrict its use to an element
        //as usually  <bars-chart> is semantically
        //more understandable
        restrict: 'E',
        //this is important,
        //we don't want to overwrite our directive declaration
        //in the HTML mark-up
        replace: false,
        //our data source would be an array
        //passed thru chart-data attribute
        scope: {data: '=chartData', whoamiin: '=whoamiin', member: '=member'},
        link: function (scope, element, attrs) {
            //in D3, any selection[0] contains the group
            //selection[0][0] is the DOM node
            //but we won't need that this time
            //a little of magic: setting it's width based
            //on the data value (d)
            //and text all with a smooth transition

            //---------------------------------------

            //console.log(attrs)
            //console.log(scope.member.graph);
            var drawn = 0;
            var margin = {top: 20, right: 0, bottom: 30, left: 40}, width, height;
            width = element.parent().innerWidth() * 0.98;
            height = element.parent().innerHeight();//$window.innerHeight * 0.75 - margin.top - margin.bottom;
            if (width < 150) width = 205;
            if (height <= width) {
                height = width;
            }
            height = width;
            //console.log("progressMeter",width,height);

            var unregister = scope.$watch(
                function () {
                    return element.parent().parent().parent().is(":visible");
                },
                function () {
                    $timeout(function () {

                        if (element.parent().height()) {
                            //width = 300;//.6*element.parent().innerWidth(),
                            //height = 300;//.6*element.parent().innerHeight();//$window.innerHeight * .75 - margin.top - margin.bottom;

                            if (drawn === 0) {
                                drawMe();
                                drawn = 1;
                            }
                        }
                    }, 0);


                });


            var drawMe = function () {

                var w = width,
                    h = height,
                    tw = ( w / 2 ) * ( w / h ),
                    th = ( h / 2 ),
                    radius = Math.min(width, height) / 2;

                var svg = d3.select(element[0])
                    .append("svg")
                    .attr("viewBox", "0 0 " + ( w ) + " " + ( h ) + "")
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .append("g");

                svg.append("g")
                    .attr("class", "slices");
                svg.append("g")
                    .attr("class", "labels");
                svg.append("g")
                    .attr("class", "lines");

                var pie = d3.layout.pie()
                    .sort(null)
                    .value(function (d) {
                        return d.value;
                    });

                var arc = d3.svg.arc()
                    .outerRadius(radius * 0.8)
                    .innerRadius(radius * 0.4);

                var outerArc = d3.svg.arc()
                    .innerRadius(radius * 0.9)
                    .outerRadius(radius * 0.9);

                svg.attr("transform", "translate(" + w + "," + th + ")");

                var key = function (d) {
                    return d.data.label;
                };

                var color = d3.scale.ordinal()
                    .domain(["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"])
                    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

                function randomData() {
                    var labels = color.domain();
                    return labels.map(function (label) {
                        return {label: label, value: Math.random()};
                    });
                }

                change(randomData());

                d3.select(".randomize")
                    .on("click", function () {
                        change(randomData());
                    });


                function change(data) {

                    /* ------- PIE SLICES -------*/
                    var slice = svg.select(".slices").selectAll("path.slice")
                        .data(pie(data), key);

                    slice.enter()
                        .insert("path")
                        .attr('class', function (d, i) {
                            return 'slice fill-color-' + i;
                        });

                    slice
                        .transition().duration(1000)
                        .attrTween("d", function (d) {
                            this._current = this._current || d;
                            var interpolate = d3.interpolate(this._current, d);
                            this._current = interpolate(0);
                            return function (t) {
                                return arc(interpolate(t));
                            };
                        });

                    slice.exit()
                        .remove();

                    /* ------- TEXT LABELS -------*/

                    var text = svg.select(".labels").selectAll("text")
                        .data(pie(data), key);

                    text.enter()
                        .append("text")
                        .attr("dy", ".35em")
                        .text(function (d) {
                            return d.data.label;
                        });

                    function midAngle(d) {
                        return d.startAngle + (d.endAngle - d.startAngle) / 2;
                    }

                    text.transition().duration(1000)
                        .attrTween("transform", function (d) {
                            this._current = this._current || d;
                            var interpolate = d3.interpolate(this._current, d);
                            this._current = interpolate(0);
                            return function (t) {
                                var d2 = interpolate(t);
                                var pos = outerArc.centroid(d2);
                                pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                                return "translate(" + pos + ")";
                            };
                        })
                        .styleTween("text-anchor", function (d) {
                            this._current = this._current || d;
                            var interpolate = d3.interpolate(this._current, d);
                            this._current = interpolate(0);
                            return function (t) {
                                var d2 = interpolate(t);
                                return midAngle(d2) < Math.PI ? "start" : "end";
                            };
                        });

                    text.exit()
                        .remove();

                    /* ------- SLICE TO TEXT POLYLINES -------*/

                    var polyline = svg.select(".lines").selectAll("polyline")
                        .data(pie(data), key);

                    polyline.enter()
                        .append("polyline");

                    polyline.transition().duration(1000)
                        .attrTween("points", function (d) {
                            this._current = this._current || d;
                            var interpolate = d3.interpolate(this._current, d);
                            this._current = interpolate(0);
                            return function (t) {
                                var d2 = interpolate(t);
                                var pos = outerArc.centroid(d2);
                                pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                                return [arc.centroid(d2), outerArc.centroid(d2), pos];
                            };
                        });

                    polyline.exit()
                        .remove();
                }

            };
        }
    };
    return directiveDefinitionObject;
});

/***
 *    ██████╗ ██╗███████╗     ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗
 *    ██╔══██╗██║██╔════╝    ██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝
 *    ██████╔╝██║█████╗      ██║     ███████║███████║██████╔╝   ██║
 *    ██╔═══╝ ██║██╔══╝      ██║     ██╔══██║██╔══██║██╔══██╗   ██║
 *    ██║     ██║███████╗    ╚██████╗██║  ██║██║  ██║██║  ██║   ██║
 *    ╚═╝     ╚═╝╚══════╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
 *      ____   _                   _    _
 *     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
 *     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
 *     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
 *     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
 *
 *    This directive renders a pie chart.
 */

PARTICLE.directive('pieChart', function ($parse, $window, $timeout) {
    //explicitly creating a directive definition variable
    //this may look verbose but is good for clarification purposes
    //in real life you'd want to simply return the object {...}
    var directiveDefinitionObject = {
        //We restrict its use to an element
        //as usually  <bars-chart> is semantically
        //more understandable
        restrict: 'E',
        //this is important,
        //we don't want to overwrite our directive declaration
        //in the HTML mark-up
        replace: false,
        //our data source would be an array
        //passed thru chart-data attribute
        scope: {data: '=chartData', whoamiin: '=whoamiin', member: '=member'},
        link: function (scope, element, attrs) {
            //in D3, any selection[0] contains the group
            //selection[0][0] is the DOM node
            //but we won't need that this time
            //a little of magic: setting it's width based
            //on the data value (d)
            //and text all with a smooth transition

            //---------------------------------------

            //console.log(attrs)
            //console.log(scope.member);
            var drawn = 0;
            var margin = {top: 20, right: 0, bottom: 30, left: 40}, width, height;
            width = element.parent().innerWidth() * 0.98;
            height = element.parent().innerHeight();//$window.innerHeight * 0.75 - margin.top - margin.bottom;
            if (width < 150) width = 205;
            if (height <= width) {
                height = width;
            }
            height = width;
            //console.log("progressMeter",width,height);

            var unregister = scope.$watch(
                function () {
                    return element.parent().parent().parent().is(":visible");
                },
                function () {
                    $timeout(function () {

                        if (element.parent().height()) {
                            //width = 300;//.6*element.parent().innerWidth(),
                            //height = 300;//.6*element.parent().innerHeight();//$window.innerHeight * .75 - margin.top - margin.bottom;

                            if (drawn === 0) {
                                drawMe();
                                drawn = 1;
                            }
                        }
                    }, 0);


                });


            var drawMe = function () {

                var dataset = [100, 90, 80, 70, 60, 50];
                var radius = Math.min(width, height) / 2;

                var w = width,
                    h = height,
                    tw = ( w / 2 ) * ( w / h ),
                    th = ( h / 2 );

                var svg = d3.select(element[0])
                    .append("svg")
                    .attr("viewBox", "0 0 " + ( tw * 2 ) + " " + ( th * 2 ) + "")
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .append("g")
                    .attr("transform", "translate(" + tw + "," + th + ")");
                var color = d3.scale.ordinal()
                    .range(["#009DD9", "#FF8300", "#B21DAC", "#D70036", "#707276", "#000000"]);
                var pie = d3.layout.pie()
                    .sort(null);
                var arc = d3.svg.arc()
                    .innerRadius(( width / 2 ) - ( width / 4 ))
                    .outerRadius(( width / 2 ));
                var path = svg.selectAll("path")
                    .data(pie(dataset))
                    .enter().append("path")
                    .attr("fill", function (d, i) {
                        return color(i);
                    })
                    .attr("d", arc)
                    .attr('class', function (d, i) {
                        return 'fill-color-' + i;
                    })
                    .each(function (d) {
                        this._current = d;
                    }); // store the initial values
                function change(newdata) {
                    path = path.data(pie(newdata)); // update the data
                    path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
                }

                // Store the displayed angles in _current.
                // Then, interpolate from _current to the new angles.
                // During the transition, _current is updated in-place by d3.interpolate.
                function arcTween(a) {
                    var i = d3.interpolate(this._current, a);
                    this._current = i(0);
                    return function (t) {
                        return arc(i(t));
                    };
                }

            };
        }
    };
    return directiveDefinitionObject;
});

/***
 *    ██████╗ ██████╗  ██████╗  ██████╗ ██████╗ ███████╗███████╗███████╗
 *    ██╔══██╗██╔══██╗██╔═══██╗██╔════╝ ██╔══██╗██╔════╝██╔════╝██╔════╝
 *    ██████╔╝██████╔╝██║   ██║██║  ███╗██████╔╝█████╗  ███████╗███████╗
 *    ██╔═══╝ ██╔══██╗██║   ██║██║   ██║██╔══██╗██╔══╝  ╚════██║╚════██║
 *    ██║     ██║  ██║╚██████╔╝╚██████╔╝██║  ██║███████╗███████║███████║
 *    ╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝
 *    ███╗   ███╗███████╗████████╗███████╗██████╗
 *    ████╗ ████║██╔════╝╚══██╔══╝██╔════╝██╔══██╗
 *    ██╔████╔██║█████╗     ██║   █████╗  ██████╔╝
 *    ██║╚██╔╝██║██╔══╝     ██║   ██╔══╝  ██╔══██╗
 *    ██║ ╚═╝ ██║███████╗   ██║   ███████╗██║  ██║
 *    ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
 *      ____   _                   _    _
 *     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
 *     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
 *     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
 *     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
 *
 *    This directive renders a progress meter chart.
 */

PARTICLE.directive('progressMeter', function ($parse, $window, $timeout) {
    //explicitly creating a directive definition variable
    //this may look verbose but is good for clarification purposes
    //in real life you'd want to simply return the object {...}
    var directiveDefinitionObject = {
        //We restrict its use to an element
        //as usually  <bars-chart> is semantically
        //more understandable
        restrict: 'E',
        //this is important,
        //we don't want to overwrite our directive declaration
        //in the HTML mark-up
        replace: false,
        //our data source would be an array
        //passed thru chart-data attribute
        scope: {
            colors: '=',
            datasets: "="
        },
        link: function (scope, element, attrs) {

            var drawn = 0;
            var margin = {top: 20, right: 0, bottom: 30, left: 40}, width, height;
            width = element.parent().innerWidth() * 0.98;
            height = element.parent().innerHeight();//$window.innerHeight * 0.75 - margin.top - margin.bottom;
            if (width < 150) width = 205;
            if (height <= width) {
                height = width;
            }
            height = width;

            var unregister = scope.$watch(
                function () {
                    return element.parent().parent().parent().is(":visible");
                },
                function () {
                    $timeout(function () {

                        if (element.parent().height()) {
                            if (drawn === 0) {
                                drawMe();
                                drawn = 1;
                            }
                        }
                    }, 0);


                });
					    /***
					     *    DEFAULT
					     *          _                          _              _    _    _
					     *     ___ |_| ___  ___    ___  ___  _| |   ___  ___ | |_ | |_ |_| ___  ___  ___
					     *    |_ -|| ||- _|| -_|  | .'||   || . |  |_ -|| -_||  _||  _|| ||   || . ||_ -|
					     *    |___||_||___||___|  |__,||_|_||___|  |___||___||_|  |_|  |_||_|_||_  ||___|
					     *                                                                     |___|
					     *

					              chartInset  :: istance from the edge of the drawn SVG
					              margin      :: standard top, right...... in pixels - no being used at moment....
					              barWidth    :: thickness/width of bar in pixels, might make this a percent in the future...
					              successIndicatorDegWidth      :: the number of degrees the success indicator should span from its start point
					                                            :: set to 0 to make it go to the very end of the chart

					      **********************************************/
					      var config = {
					        chartInset:0,
					        hasSuccessIndicator:true,
					        hasBandIndicator:false,
					        margin: {
					          top: 0,
					          right: 0,
					          bottom: 0,
					          left: 0
					        },
					        barWidth:0.20,
					        successIndicatorDegWidth:0,
					        startAngle:-110,
					        endAngle:110,
					        needLength:1,
					        colors: {
					          primary_fill: "color-pewter",
					          color_2: "boldorange-0-fade-1",
					          success: "color-bluepuddy-0-fade-5",
					          needle: "color-bluepuddy-0-fade-0",
					          bg: "color-white-6-fade-8",
					          legend:"color-bluepuddy-8-fade-0"
					        }
					      };

            var drawMe = function () {
                var twoPi = 2 * Math.PI;

                var dataset = {
                    progress: Math.floor(Math.random() * 100),
                    total: 100
                };


                var dataset2 = {
                    progress: Math.floor(Math.random() * 100),
                    total: 100
                };
                var i, bits = 3;
                var dataSets = [], archs = [],
                    bandWidth = ((width - dataSets.length * 2) * 0.25) / dataSets.length;

                for (i = 0; i < bits; i++) {
                    dataSets.push({progress: Math.floor(Math.random() * 100), total: 100});
                }

                var arcs = [];


                var arc = d3.svg.arc()
                    .innerRadius(width * 0.25 - width / (2 * dataSets.length) / 2)
                    .outerRadius(width * 0.50)
                    .startAngle(0);

                var arc2 = d3.svg.arc()
                    .innerRadius(width * 0.29)
                    .outerRadius(width * 0.395)
                    .startAngle(0);

                var w = width,
                    h = height,
                    tw = ( w / 2 ) * ( w / h ),
                    th = ( h / 2 );

                var svg = d3.select(element[0])
                    .append("svg")
                    .attr("viewBox", "0 0 " + ( tw * 2 ) + " " + ( th * 2 ) + "")
                    .attr("preserveAspectRatio", "xMinYMin slice")
                    .append("g")
                    .attr("transform", "translate(" + tw + "," + th + ")");


                var meter = svg.append("g")
                    .attr("class", "info");

                var background = meter.append("path")
                    .datum({endAngle: twoPi})
                    .attr("class", config.colors.bg)
                    .attr("d", arc);


                var text = meter.append("text")
                    .attr("text-anchor", "middle")
                    .attr("dy", ".35em")
                    .attr("font-size", "4em")
                    .attr("font-weight", "300")
                    .text((scope.datasets[0] * 100) + "%");

                var words = meter.append("text")
                    .attr("text-anchor", "middle")
                    .attr("dy", "3em")
                    .attr("font-size", "1em")
                    .attr("font-weight", "300")
                    .text("Complete");


                var foreground = meter.append("path")
                    .datum({endAngle: 0})
                    .attr("class", "bg-" + (scope.datasets[0] > 0.5  ? config.colors.success : config.colors.needle))
                    .attr("d", arc);
                // var background2 = meter.append("path")
                //          .datum({endAngle: twoPi})
                //          .attr("class", "bg-"+scope.colors.bg)
                //          .attr("d", arc2);
                //
                //      var foreground2 = meter.append("path")
                //          .datum({endAngle:0})
                //          .attr("class", "bg-"+(scope.datasets[1]>scope.colors.min_success[1]?scope.colors.success:scope.colors.color_2))
                //          .attr("d", arc2);
                //
                //          console.log(scope.datasets)

                foreground.transition()
                    .duration(1000)
                    .ease("linear")
                    .attrTween("d", function (d) {
                        var interpolate = d3.interpolate(d.endAngle, twoPi * scope.datasets[0]);
                        return function (t) {
                            d.endAngle = interpolate(t);
                            return arc(d);
                        };
                    });


                // foreground2.transition()
                //         .duration(1000)
                //         .ease("linear")
                //         .attrTween("d", function(d) {
                //                    var interpolate = d3.interpolate(d.endAngle, twoPi *  scope.datasets[1])
                //                    return function(t) {
                //                       d.endAngle = interpolate(t);
                //                       return arc2(d);
                //                    }
                //                 });


            };
        }
    };
    return directiveDefinitionObject;
});

/***
 *    ███████╗███████╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗
 *    ██╔════╝██╔════╝██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
 *    ███████╗█████╗  ██║        ██║   ██║██║   ██║██╔██╗ ██║
 *    ╚════██║██╔══╝  ██║        ██║   ██║██║   ██║██║╚██╗██║
 *    ███████║███████╗╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
 *    ╚══════╝╚══════╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
 *    ██╗  ██╗███████╗ █████╗ ██████╗ ███████╗██████╗
 *    ██║  ██║██╔════╝██╔══██╗██╔══██╗██╔════╝██╔══██╗
 *    ███████║█████╗  ███████║██║  ██║█████╗  ██████╔╝
 *    ██╔══██║██╔══╝  ██╔══██║██║  ██║██╔══╝  ██╔══██╗
 *    ██║  ██║███████╗██║  ██║██████╔╝███████╗██║  ██║
 *    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝
 *      ____   _                   _    _
 *     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
 *     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
 *     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
 *     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
 *
 *    This directive renders a structural component of the page,
 *    based on information in the UI object returned by the data source.
 */

PARTICLE.directive('sectionHeader', function () {
    return {
        restrict: "E",
        scope: {
            item: "="
        },
        templateUrl: "/directives/sectionheader.html"
    };
});

/***
* ██████╗  █████╗ ██████╗      ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗
* ██╔══██╗██╔══██╗██╔══██╗    ██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝
* ██████╔╝███████║██████╔╝    ██║     ███████║███████║██████╔╝   ██║
* ██╔══██╗██╔══██║██╔══██╗    ██║     ██╔══██║██╔══██║██╔══██╗   ██║
* ██████╔╝██║  ██║██║  ██║    ╚██████╗██║  ██║██║  ██║██║  ██║   ██║
* ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
*
*      ____   _                   _    _
*     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
*     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
*     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
*     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
*
*    This directive renders a bar chart.
*/

PARTICLE.directive('stackedBarchart', function ($parse, $window, $timeout) {

  /* Usage:
    1. <needle-chart></needle-chart> is semantically

    Attr Params:
      1. config
      2. datasets*/

    var directiveDefinitionObject = {
        //Restrict use to an element
        restrict: 'E',
        //Do NOT overwrite our directive declaration in the HTML mark-up
        replace: false,
        //Chart data and config passed thru attributes
        scope: {
            config: '=',
            datasets: "=",
            colors: "=",
            percentcomplete: "=",
            successpercent: "=",
            max:"=",
            min:"=",
            mockup:"=",
            index:"="
        },
    link: function (scope, element, attrs) {
        var drawn = 0;

    $timeout(function() {

            if(drawn===0){
                drawMe();
                drawn=1;
            }

    }, 50);

    var drawMe = function() {

        var width, height, dataset, layers, spending, x, y, z, chart, xAxis, yAxis, layer;

        /***
         *    DEFAULT
         *          _                          _              _    _    _
         *     ___ |_| ___  ___    ___  ___  _| |   ___  ___ | |_ | |_ |_| ___  ___  ___
         *    |_ -|| ||- _|| -_|  | .'||   || . |  |_ -|| -_||  _||  _|| ||   || . ||_ -|
         *    |___||_||___||___|  |__,||_|_||___|  |___||___||_|  |_|  |_||_|_||_  ||___|
         *                                                                     |___|
         *

                  chartInset  :: istance from the edge of the drawn SVG
                  margin      :: standard top, right...... in pixels - no being used at moment....
                  barWidth    :: thickness/width of bar in pixels, might make this a percent in the future...
                  successIndicatorDegWidth      :: the number of degrees the success indicator should span from its start point
                                                :: set to 0 to make it go to the very end of the chart

          **********************************************/
          var config = {
              chartInset:0,
              hasSuccessIndicator:true,
              hasBandIndicator:false,
              margin: {
                  top: 20,
                  right: 20,
                  bottom: 30,
                  left: 50
              },
              barWidth:10,
              widthPercentSize:1.1,
              needLength:1,
              colors: {
                  primary_fill: "color-pewter",
                  color_2: "boldorange-0-fade-1",
                  success: "color-bluepuddy-0-fade-5",
                  needle: "color-pewter-0-fade-0",
                  bg: "color-white-6-fade-8",
                  legend:"color-bluepuddy-8-fade-0"
              },
              max:100,
              min:0
          }; // End config

          /***
          *                                     _                _       ___            _  _
          *     ___  _ _  ___  ___  _ _ _  ___ |_|| |_  ___    _| | ___ |  _| ___  _ _ | || |_  ___
          *    | . || | || -_||  _|| | | ||  _|| ||  _|| -_|  | . || -_||  _|| .'|| | || ||  _||_ -|
          *    |___| \_/ |___||_|  |_____||_|  |_||_|  |___|  |___||___||_|  |__,||___||_||_|  |___|
          *
          */

          if (scope.config !== undefined){
              Object.keys(scope.config).forEach(function(key,index) {
                  config[key] = scope.config[key];
              });
          }

          /***
          *                 _                                         _
          *     _____  ___ |_| ___    ___  ___  ___  ___  ___  ___  _| | _ _  ___  ___
          *    |     || .'|| ||   |  | . ||  _|| . ||  _|| -_|| -_|| . || | ||  _|| -_|
          *    |_|_|_||__,||_||_|_|  |  _||_|  |___||___||___||___||___||___||_|  |___|
          *                          |_|
          */

          /***
          *
          *     ___
          *    |_  |
          *     _| |_  _
          *    |_____||_|   Select the directive element to push our SVG into:
          *
          */

          el = d3.select(element[0]);

          /***
          *
          *     ___
          *    |_  |
          *    |  _| _     Calculate the width of the width and height of the chart
          *    |___||_|    Height is fixed to 200, width varies with parent element width
          *
          */

          width = element[0].parentElement.clientWidth;
          height = 200;

          /***
          *     ___
          *    |_  |
          *    |_  | _
          *    |___||_|    Prepare dataset to be used by D3
          *                Update this section to match updated dataset
          */

          dataset = scope.datasets;
          spending = ["DME", "OM"];

          // Parse the data
          layers = d3.layout.stack()(spending.map(function(c) {
              return dataset.map(function(d) {
                return {x: d.year, y: d[c]};
            });
          }));

         /***
          *     ___
          *    | | |
          *    |_  | _
          *      |_||_|    Create Chart Objects: X/Y Scales, Primary Chart Object,
          *                X/Y Axes, and Data Bars.
          */

          x = d3.scale.ordinal()
              .rangeRoundBands([config.margin.left, width - config.margin.right], 0.2)
              .domain(layers[0].map(function(d) { return d.x; }));

          y = d3.scale.linear()
              .rangeRound([height - config.margin.bottom, config.margin.top])
              .domain([0, d3.max(layers[layers.length - 1], function(d) { return d.y0 + d.y; })])
              .nice();

          z = d3.scale.category10();

          /*chart = el.append("svg")
              .attr("height",height)
              .attr("width",width)
              .attr("class", "chart");*/




      chart = d3.select(element[0])
          .append("svg")
          .attr("viewBox", "0 0 " + width + " " + height + "")
          .attr("preserveAspectRatio", "xMinYMin slice")
          .append('g')
          .attr("height",height)
          .attr("width",width);


          xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom")
              .outerTickSize(0);

          yAxis = d3.svg.axis()
              .scale(y)
              .orient("left")
              .innerTickSize(- width + config.margin.left + config.margin.right)
              .outerTickSize(0)
              .ticks(5)
              .tickPadding(10);

          layer = chart.selectAll(".layer")
              .data(layers)
            .enter().append("g")
              .attr("class", "layer")
              .style("fill", function(d, i) { return z(i); });

          layer.selectAll("rect")
              .data(function(d) { return d; })
            .enter().append("rect")
              .attr("x", function(d) { return x(d.x); })
              .attr("y", function(d) { return y(d.y + d.y0); })
              .attr("height", function(d) { return y(d.y0) - y(d.y + d.y0); })
              .attr("width", x.rangeBand() - 1);

          var x_axis = chart.append("g")
              .attr("class", "axis axis--x")
              .attr("transform", "translate(0," + (height - config.margin.bottom) + ")")
              .attr("class", "color-white-0")
              .call(xAxis);

          var y_axis = chart.append("g")
              .attr("class", "axis axis--y")
              .attr("transform", "translate(" + (config.margin.left) + ",0)")
              .attr("class", "color-white-0")
              .call(yAxis);

          y_axis.selectAll("text")
              .text(function(d){
                  return ("$ " + d + "M");
              });

      }; // DrawMe end

          /***
          *     ___
          *    |  _|
          *    |_  | _
          *    |___||_|    Run code and return visualization (D3) object
          */


    } // link end

  }; // directiveDefinitionObject end
  return directiveDefinitionObject;
}); //End Directive
/***
* ████████╗██╗███╗   ███╗███████╗███████╗███████╗██████╗ ██╗███████╗███████╗    ██████╗  █████╗ ██████╗ ██████╗ ██╗      ██████╗ ████████╗
* ╚══██╔══╝██║████╗ ████║██╔════╝██╔════╝██╔════╝██╔══██╗██║██╔════╝██╔════╝    ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║     ██╔═══██╗╚══██╔══╝
*    ██║   ██║██╔████╔██║█████╗  ███████╗█████╗  ██████╔╝██║█████╗  ███████╗    ██████╔╝███████║██████╔╝██████╔╝██║     ██║   ██║   ██║
*    ██║   ██║██║╚██╔╝██║██╔══╝  ╚════██║██╔══╝  ██╔══██╗██║██╔══╝  ╚════██║    ██╔══██╗██╔══██║██╔══██╗██╔═══╝ ██║     ██║   ██║   ██║
*    ██║   ██║██║ ╚═╝ ██║███████╗███████║███████╗██║  ██║██║███████╗███████║    ██████╔╝██║  ██║██║  ██║██║     ███████╗╚██████╔╝   ██║
*    ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝
*
*      ____   _                   _    _
*     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
*     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
*     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
*     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
*
*    This directive renders a timeseries barplot.
*/

PARTICLE.directive('timeseriesBarplot', function ($parse, $window, $timeout) {

  /* Usage:
    1. <needle-chart></needle-chart> is semantically

    Attr Params:
      1. config
      2. datasets*/

    var directiveDefinitionObject = {
        //Restrict use to an element
        restrict: 'E',
        //Do NOT overwrite our directive declaration in the HTML mark-up
        replace: false,
        //Chart data and config passed thru attributes
        scope: {
            config: '=',
            datasets: "=",
            colors: "=",
            percentcomplete: "=",
            successpercent: "=",
            max:"=",
            min:"=",
            mockup:"=",
            index:"="
        },
    link: function (scope, element, attrs) {

    var drawn = 0;

    $timeout(function() {
            if(drawn===0){
                drawMe();
                drawn=1;
            }
    }, 1);

    var drawMe = function() {

        var width, height, datasetfull, dataset, layers;

        /***
         *    DEFAULT
         *          _                          _              _    _    _
         *     ___ |_| ___  ___    ___  ___  _| |   ___  ___ | |_ | |_ |_| ___  ___  ___
         *    |_ -|| ||- _|| -_|  | .'||   || . |  |_ -|| -_||  _||  _|| ||   || . ||_ -|
         *    |___||_||___||___|  |__,||_|_||___|  |___||___||_|  |_|  |_||_|_||_  ||___|
         *                                                                     |___|
         *

                  chartInset  :: istance from the edge of the drawn SVG
                  margin      :: standard top, right...... in pixels - no being used at moment....
                  barWidth    :: thickness/width of bar in pixels, might make this a percent in the future...
                  successIndicatorDegWidth      :: the number of degrees the success indicator should span from its start point
                                                :: set to 0 to make it go to the very end of the chart

          **********************************************/
          var config = {
              chartInset:0,
              hasSuccessIndicator:true,
              hasBandIndicator:false,
              margin: {
                  top: 20,
                  right: 20,
                  bottom: 60,
                  left: 60
              },
              barWidth:20,
              widthPercentSize:1.1,
              needLength:1,
              colors: {
                  primary_fill: "color-pewter",
                  color_2: "boldorange-0-fade-1",
                  success: "color-bluepuddy-0-fade-5",
                  needle: "color-pewter-0-fade-0",
                  bg: "color-white-6-fade-8",
                  legend:"color-bluepuddy-8-fade-0"
              },
              max:100,
              min:0,
              endDate: new Date(),
              startDate: new Date() - 1000*60*60*24*365
          }; // End config

          console.log('timeseries dates', config.endDate, config.startDate);

          /***
          *                                     _                _       ___            _  _
          *     ___  _ _  ___  ___  _ _ _  ___ |_|| |_  ___    _| | ___ |  _| ___  _ _ | || |_  ___
          *    | . || | || -_||  _|| | | ||  _|| ||  _|| -_|  | . || -_||  _|| .'|| | || ||  _||_ -|
          *    |___| \_/ |___||_|  |_____||_|  |_||_|  |___|  |___||___||_|  |__,||___||_||_|  |___|
          *
          */

          if (scope.config !== undefined){
              Object.keys(scope.config).forEach(function(key,index) {
                  config[key] = scope.config[key];
              });
          }

          /***
          *                 _                                         _
          *     _____  ___ |_| ___    ___  ___  ___  ___  ___  ___  _| | _ _  ___  ___
          *    |     || .'|| ||   |  | . ||  _|| . ||  _|| -_|| -_|| . || | ||  _|| -_|
          *    |_|_|_||__,||_||_|_|  |  _||_|  |___||___||___||___||___||___||_|  |___|
          *                          |_|
          */

          /***
          *
          *     ___
          *    |_  |
          *     _| |_  _
          *    |_____||_|   Select the directive element to push our SVG into:
          *
          */

          el = d3.select(element[0]);

          /***
          *
          *     ___
          *    |_  |
          *    |  _| _     Calculate the width of the width and height of the chart
          *    |___||_|    Height is fixed to 200, width varies with parent element width
          *
          */

          width = element[0].parentElement.clientWidth;
          height = 275;

          /***
          *     ___
          *    |_  |
          *    |_  | _
          *    |___||_|    Prepare dataset to be used by D3
          *                Update this section to match updated dataset
          */

          dataset = scope.datasets;
          readDate = d3.time.format("%m/%d/%y").parse;
          dataset.forEach(function(d){
              d.date = new Date(d.date);
          });

              // Function below establishes start and end dates for the graph and removes
              // the values that fall outside the range. It also parses data elements in X and Y
              // components that will be used for plotting.

              var startdate = readDate("06/30/15");
              var enddate = readDate("06/30/16");
              var sub = [];
              for(var i = 0; i < dataset.length; i++){
                  if(dataset[i].date >= startdate & dataset[i].date <= enddate){
                      sub.push(d3.values(dataset)[i]);
                  }
                  else {}
              }

              // Parse the data
              layers = sub.map(function(d) {
                  return {x: d.date, y: +d.rating, y0: +0};
              });

          /***
          *     ___
          *    | | |
          *    |_  | _
          *      |_||_|    Create Chart Objects: X/Y Scales, Primary Chart Object,
          *                X/Y Axes, and Data Bars.
          */

              // Define X Scale
              xScale = d3.time.scale()
                  .domain([startdate, enddate])
                  .range([0 + config.margin.left, width - config.margin.right]);

              // Define Y Scale
              yScale = d3.scale.linear()
                  .domain([0, 5])
                  .range([height-config.margin.bottom, config.margin.top])
                  .nice();

              var yticks = 5;
              var xticks = 12;
              var ytickdist = (height-config.margin.bottom - config.margin.top)/yticks;
              var xtickdist = (width - config.margin.right - config.margin.left)/xticks;

              var chart = el.append("svg")
                  .attr("viewBox", "0 0 " + width + " " + height + "")
                  .attr("preserveAspectRatio", "xMinYMin slice")
                  .append('g')
                  .attr("height",height)
                  .attr("width",width);

              var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient("bottom")
                  .outerTickSize(0);

              var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .ticks(yticks)
                  .innerTickSize(- width + config.margin.left + config.margin.right)
                  .outerTickSize(0)
                  .tickPadding(10);

              var x_axis = chart.append("g") // Draw axes: x axis
                  // .attr("id","xaxis"+indexval)
                  .attr("class", "axis x")
                  .attr("transform","translate(0, " + (height - config.margin.bottom) + ")")
                  .call(xAxis)
                      .selectAll("text")
                    .attr("class","color-white")
                      .style("text-anchor", function(d) {
                          if(d.getMonth() !== 0){
                              return "middle";
                          } else {
                              return "start";
                          }
                      })
                      .attr("dy", "10px")
                      .attr("transform", function(d) {
                          if(d.getMonth() !== 0){
                              return "translate(" + xtickdist/2 + ", 0)";
                          }
                      })
                      .style("font-weight", function(d) {
                          if(d.getMonth() === 0){
                              return "bold";
                          }
                      });

              var y_axis = chart.append("g") // Draw axes: y axis
                  // .attr("id","yaxis"+indexval)
                  .attr("class", "axis y")
                  .attr("transform","translate(" + config.margin.left + ",0)")
                  .call(yAxis)
                      .selectAll("text")
                      .attr("class","color-white")
                      .attr("transform","translate(0, " + ytickdist/2 + ")")
                      .style("text-anchor", "middle")
                      .text(function(d) {
                          if(d == "0"){
                              return null;
                          } else {
                              return d;
                          }
                      });
              var yTick = (height - config.margin.top - config.margin.bottom)/yticks;
              y_axis.append("g")
                  .append("text")
                  .attr("x", (-height + config.margin.bottom + config.margin.top)/2 - config.margin.top)
                  .attr("y", -config.margin.left/2)
                  .attr("transform", "rotate(-90)")
                  .attr("text-anchor", "middle")
                  .style("font-weight", "bold")
                  .attr("class","color-white")
                  .text("Rating");

              x_axis.append("g")
                  .append("text")
                  .attr("y", 50)
                  .attr("x", (0.5 * width))
                  .attr("text-anchor", "middle")
                  .style("font-weight", "bold")
                  .attr("class","color-white")
                  .text("Submission Date");

              var bars = chart.selectAll("rect") // Create Bars
                  .data(layers)
                  .enter()
                  .append("rect")
                      .attr("x",function(d){
                          return xScale(d.x);
                      })
                      .attr("y", function(d) {
                          return yScale(d.y0 + d.y);
                      })
                      .attr("width", config.barWidth)
                      .attr("height", function(d) {
                          return yScale(d.y0) - yScale(d.y + d.y0);
                      })
                      .attr("date", function(d) {
                          return d.x;
                      })
                      .attr("rating", function(d){
                          return d.y;
                      })
                      .attr("class", function(d) {
                          if(d.y == 3) {
                              return "bg-color-offgold-0-fade-4";
                          } else if (d.y == "1" | d.y == "2") {
                              return "bg-color-boldred-0-fade-4";
                          } else if (d.y == "4" | d.y == "5") {
                              return "bg-color-lillypad-0-fade-4";
                          } else {
                              return "#000";
                          }
                      });

      }; // DrawMe end

          /***
          *     ___
          *    |  _|
          *    |_  | _
          *    |___||_|    Run code and return visualization (D3) object
          *
          */

    } // link end

  }; // directiveDefinitionObject end
  return directiveDefinitionObject;
}); //End Directive








/***
* ████████╗██████╗ ███████╗███╗   ██╗██████╗      ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗
* ╚══██╔══╝██╔══██╗██╔════╝████╗  ██║██╔══██╗    ██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝
*    ██║   ██████╔╝█████╗  ██╔██╗ ██║██║  ██║    ██║     ███████║███████║██████╔╝   ██║
*    ██║   ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║    ██║     ██╔══██║██╔══██║██╔══██╗   ██║
*    ██║   ██║  ██║███████╗██║ ╚████║██████╔╝    ╚██████╗██║  ██║██║  ██║██║  ██║   ██║
*    ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝      ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
*
*      ____   _                   _    _
*     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
*     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
*     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
*     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
*
*    This directive renders a trend chart.
*/

PARTICLE.directive('trendChart', function ($parse, $window, $timeout) {

  /* Usage:
    1. <needle-chart></needle-chart> is semantically

    Attr Params:
      1. config
      2. datasets*/

    var directiveDefinitionObject = {
        //Restrict use to an element
        restrict: 'E',
        //Do NOT overwrite our directive declaration in the HTML mark-up
        replace: false,
        //Chart data and config passed thru attributes
        scope: {
            config: '=',
            datasets: "=",
            colors: "=",
            percentcomplete: "=",
            successpercent: "=",
            max:"=",
            min:"=",
            mockup:"=",
            index:"="
        },

    link: function (scope, element, attrs) {
        var drawn = 0;

    $timeout(function() {
        if (element.parent().height()) {
            if(drawn===0){
                drawMe(scope.index);
                drawn=1;
            }
        }
    }, 5);
    var drawMe = function(indexval) {


        var width, height, dataset, layers;

        /***
        *    DEFAULT
        *          _                          _              _    _    _
        *     ___ |_| ___  ___    ___  ___  _| |   ___  ___ | |_ | |_ |_| ___  ___  ___
        *    |_ -|| ||- _|| -_|  | .'||   || . |  |_ -|| -_||  _||  _|| ||   || . ||_ -|
        *    |___||_||___||___|  |__,||_|_||___|  |___||___||_|  |_|  |_||_|_||_  ||___|
        *                                                                     |___|
        *
        *
        *        chartInset  :: istance from the edge of the drawn SVG
        *        margin      :: standard top, right...... in pixels - no being used at moment....
        *        barWidth    :: thickness/width of bar in pixels, might make this a percent in the future...
        *        successIndicatorDegWidth      :: the number of degrees the success indicator should span from its start point
        *                                      :: set to 0 to make it go to the very end of the chart
        *
        ***/
          var config = {
              chartInset:0,
              hasSuccessIndicator:true,
              hasBandIndicator:false,
              margin: {
                  top: 10,
                  right: 40,
                  bottom: 60,
                  left: 70
              },
              barWidth:10,
              widthPercentSize:1.1,
              needLength:1,
              colors: {
                  primary_fill: "color-pewter",
                  color_2: "boldorange-0-fade-9",
                  success: "color-bluepuddy-0-fade-5",
                  needle: "color-pewter-0-fade-0",
                  bg: "color-white-6-fade-8",
                  legend:"color-bluepuddy-8-fade-0"
              },
              max:100,
              min:0
          }; // End config

          /***
          *                                     _                _       ___            _  _
          *     ___  _ _  ___  ___  _ _ _  ___ |_|| |_  ___    _| | ___ |  _| ___  _ _ | || |_  ___
          *    | . || | || -_||  _|| | | ||  _|| ||  _|| -_|  | . || -_||  _|| .'|| | || ||  _||_ -|
          *    |___| \_/ |___||_|  |_____||_|  |_||_|  |___|  |___||___||_|  |__,||___||_||_|  |___|
          *
          */

          if (scope.config !== undefined){
              Object.keys(scope.config).forEach(function(key,index) {
                  config[key] = scope.config[key];
              });
          }

          /***
          *                 _                                         _
          *     _____  ___ |_| ___    ___  ___  ___  ___  ___  ___  _| | _ _  ___  ___
          *    |     || .'|| ||   |  | . ||  _|| . ||  _|| -_|| -_|| . || | ||  _|| -_|
          *    |_|_|_||__,||_||_|_|  |  _||_|  |___||___||___||___||___||___||_|  |___|
          *                          |_|
          */

          /***
          *
          *     ___
          *    |_  |
          *     _| |_  _
          *    |_____||_|   Select the directive element to push our SVG into:
          *
          */

          el = d3.select(element[0]);

          /***
          *
          *     ___
          *    |_  |
          *    |  _| _     Calculate the width of the width and height of the chart
          *    |___||_|    Height is fixed to 400, width varies with parent element width
          *
          */

          width = element[0].parentElement.clientWidth;
          height = 275;

          /***
          *     ___
          *    |_  |
          *    |_  | _
          *    |___||_|    Prepare dataset to be used by D3
          *                Update this section to match updated dataset
          */

          dataset = scope.datasets;
          dataset.forEach(function(d){
              d.date = new Date(d.date);
          });

          var color = d3.scale.category10();
          color.domain(d3.keys(dataset[0]).filter(function(key) { return key !== "date" & key !== "label"; }));

          var metrics = color.domain().map(function(name) {
              return {
                  name: name,
                  values: dataset.map(function(d) {
                      return {date: d.date, value: +d[name]};
                  })
              };
          });

          var xTickValues = [];
          metrics[0].values.forEach(function(d){
              xTickValues.push(d.date);
          });

          var  date_format = d3.time.format("%b %y");

          /***
          *     ___
          *    | | |
          *    |_  | _
          *      |_||_|    Create Chart Objects: X/Y Scales, Primary Chart Object,
          *                X/Y Axes, and Data Bars.
          */

          // Define X Scale
          xScale = d3.time.scale()
              .domain(d3.extent(dataset, function(d) { return d.date; }))
              .range([0 + config.margin.left, width - config.margin.right]);

          // Define Y Scale
          yScale = d3.scale.linear()
              .domain([0, 100])
              .range([height-config.margin.bottom, config.margin.top]);

          var yticks = 5;
          var xticks = dataset.length;


      var chart = d3.select(element[0])
          .append("svg")
          .attr("viewBox", "0 0 " + width + " " + height + "")
          .attr("preserveAspectRatio", "xMinYMin slice")
          .append('g')
          .attr("height",height)
          .attr("width",width);

          var xAxis = d3.svg.axis()
              .scale(xScale)
              .orient("bottom")
              .innerTickSize(-height + config.margin.top + config.margin.bottom)
              .outerTickSize(0)
              .tickPadding(10)
              .tickValues(xTickValues)
              .tickFormat(date_format);

          var yAxis = d3.svg.axis()
              .scale(yScale)
              .orient("left")
              .ticks(yticks)
              .innerTickSize(- width + config.margin.left + config.margin.right)
              .outerTickSize(0)
              .tickPadding(5);

          var x_axis = chart.append("g") // Draw axes: x axis
              .attr("id","xaxis")
              .attr("class", "color-white")
              .attr("transform","translate(0, " + (height - config.margin.bottom) + ")")
              .call(xAxis)
                  .selectAll("text")
                  .style("text-anchor", "middle")
                  .attr("dy", "10px")
                  .style("font-weight", function(d) {
                      if(d.getMonth() === 0){
                          return "bold";
                      }
                  });

          var y_axis = chart.append("g") // Draw axes: y axis
              .attr("id","yaxis"+indexval)
              .attr("class", "color-white")
              .attr("transform","translate(" + config.margin.left + ",0)")
              .call(yAxis)
                  .selectAll("text")
                  .style("text-anchor", "end")
                  .text(function(d) {
                      return d + "%";
                  });

          d3.select("#yaxis"+indexval)
              .append("text")
              .attr("x", (-height + config.margin.bottom + config.margin.top)/2 - config.margin.top)
              .attr("y", -config.margin.left/1.5)
              .attr("transform", "rotate(-90)")
              .attr("text-anchor", "middle")
              .style("font-weight", "bold")
              .text("Performance");

          d3.select("#xaxis")
              .append("text")
              .attr("y", 40)
              .attr("x", (0.5 * width))
              .attr("text-anchor", "middle")
              .text("Snapshot Date");

          var line = d3.svg.line()
              .interpolate("linear")
              .x(function(d) {
                  return xScale(d.date);
              })
              .y(function(d) {
                  return yScale(d.value);
              });

          var metric = chart.selectAll(".metric")
              .data(metrics)
              .enter()
              .append("g")
                .attr("class", "metric"
                     )
                .attr("value", function(d){
                    return d.value;
                });

          metric.append("path")
              .attr("class", "line")
              .attr("d", function(d) {
                  return line(d.values);
              })
              .style("stroke", function(d) { return color(d.name); })
              .style("stroke-width", "8px")
              .style("fill", "none");

          var point = metric.append("g")
              .attr("class", "line-point");

          point.selectAll('circle')
              .data(function(d){ return d.values; })
              .enter()
              .append('circle')
                  .attr("cx", function(d) { return xScale(d.date); })
                  .attr("cy", function(d) { return yScale(d.value); })
                  .attr("r", 8)
                  .attr("class", "color-white")
                  .style("stroke-width", "1px")
                  .style("stroke", function(d) { return color(this.parentNode.__data__.name); });



      }; // DrawMe end

          /***
          *     ___
          *    |  _|
          *    |_  | _
          *    |___||_|    Run code and return visualization (D3) object
          */

    } // link end

  }; // directiveDefinitionObject end
  return directiveDefinitionObject;
}); //End Directive
/***
 *    ██╗   ██╗███████╗ █████╗     ███╗   ███╗ █████╗ ██████╗
 *    ██║   ██║██╔════╝██╔══██╗    ████╗ ████║██╔══██╗██╔══██╗
 *    ██║   ██║███████╗███████║    ██╔████╔██║███████║██████╔╝
 *    ██║   ██║╚════██║██╔══██║    ██║╚██╔╝██║██╔══██║██╔═══╝
 *    ╚██████╔╝███████║██║  ██║    ██║ ╚═╝ ██║██║  ██║██║
 *     ╚═════╝ ╚══════╝╚═╝  ╚═╝    ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝
 *      ____   _                   _    _
 *     |  _ \ (_) _ __  ___   ___ | |_ (_)__   __ ___
 *     | | | || || '__|/ _ \ / __|| __|| |\ \ / // _ \
 *     | |_| || || |  |  __/| (__ | |_ | | \ V /|  __/
 *     |____/ |_||_|   \___| \___| \__||_|  \_/  \___|
 *
 *    This directive renders a USA map chart.
 */

PARTICLE.directive('usMap', function ($parse, $window, $timeout) {
    //explicitly creating a directive definition variable
    //this may look verbose but is good for clarification purposes
    //in real life you'd want to simply return the object {...}
    var directiveDefinitionObject = {
        //We restrict its use to an element
        //as usually  <bars-chart> is semantically
        //more understandable
        restrict: 'E',
        //this is important,
        //we don't want to overwrite our directive declaration
        //in the HTML mark-up
        replace: false,
        //our data source would be an array
        //passed thru chart-data attribute
        scope: {data: '=chartData', whoamiin: '=whoamiin', member: '=member'},
        link: function (scope, element, attrs) {
            //in D3, any selection[0] contains the group
            //selection[0][0] is the DOM node
            //but we won't need that this time
            //a little of magic: setting it's width based
            //on the data value (d)
            //and text all with a smooth transition

            //---------------------------------------

            //console.log(attrs)
            var drawn = 0;
            var margin = {top: 20, right: 0, bottom: 30, left: 40}, width, height;
            width = element.parent().innerWidth() * 0.9;
            height = element.parent().innerHeight() * 0.5;//$window.innerHeight * .75 - margin.top - margin.bottom;
            if (width < 150) width = 205;
            if (height <= width) {
                height = width;
            }
            height = 500;
            //height = width
            console.log("progressMeter", width, height);

            var unregister = scope.$watch(
                function () {
                    return element.parent().parent().parent().is(":visible");
                },
                function () {
                    $timeout(function () {

                        if (element.parent().height()) {


                            if (drawn === 0) {
                                drawMe();
                                drawn = 1;
                            }
                        }
                    }, 0);


                });


            var drawMe = function () {


                //Define map projection
                var projection = d3.geo.albersUsa()
                    .translate([width / 2, height / 2]).scale([1100]);


                //Define path generator
                var path = d3.geo.path()
                    .projection(projection);

                //Define quantize scale to sort data values into buckets of color
                var color = d3.scale.quantize()
                    .range(["#8AB28C", "rgba(97, 65, 82,.5)", "#666b95", "rgb(49,163,84)", "rgb(0,109,44)"]);
                //Colors taken from colorbrewer.js, included in the D3 download

                //Create SVG element
                var svg = d3.select(element[0])
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);

                //Load in agriculture data
                d3.csv("csv/us-ag-productivity-2004.csv", function (data) {

                    //Set input domain for color scale
                    color.domain([
                        d3.min(data, function (d) {
                            return d.value;
                        }),
                        d3.max(data, function (d) {
                            return d.value;
                        })
                    ]);

                    //Load in GeoJSON data
                    d3.json("json/us-states.json", function (json) {

                        //Merge the ag. data and GeoJSON
                        //Loop through once for each ag. data value
                        for (var i = 0; i < data.length; i++) {

                            //Grab state name
                            var dataState = data[i].state;

                            //Grab data value, and convert from string to float
                            var dataValue = parseFloat(data[i].value);

                            //Find the corresponding state inside the GeoJSON
                            for (var j = 0; j < json.features.length; j++) {

                                var jsonState = json.features[j].properties.name;

                                if (dataState == jsonState) {

                                    //Copy the data value into the JSON
                                    json.features[j].properties.value = dataValue;

                                    //Stop looking through the JSON
                                    break;

                                }
                            }
                        }

                        //Bind data and create one path per GeoJSON feature
                        svg.selectAll("path")
                            .data(json.features)
                            .enter()
                            .append("path")
                            .attr("d", path)
                            .style("fill", function (d) {
                                //Get data value
                                var value = d.properties.value;

                                if (value) {
                                    //If value exists…
                                    return color(value);
                                } else {
                                    //If value is undefined…
                                    return "#ccc";
                                }
                            });

                    });

                });


            };


        }
    };
    return directiveDefinitionObject;
});

/***
 *     █████╗ ██████╗ ██████╗ ██╗  ██╗   ██╗    ███████╗██╗██╗  ████████╗███████╗██████╗
 *    ██╔══██╗██╔══██╗██╔══██╗██║  ╚██╗ ██╔╝    ██╔════╝██║██║  ╚══██╔══╝██╔════╝██╔══██╗
 *    ███████║██████╔╝██████╔╝██║   ╚████╔╝     █████╗  ██║██║     ██║   █████╗  ██████╔╝
 *    ██╔══██║██╔═══╝ ██╔═══╝ ██║    ╚██╔╝      ██╔══╝  ██║██║     ██║   ██╔══╝  ██╔══██╗
 *    ██║  ██║██║     ██║     ███████╗██║       ██║     ██║███████╗██║   ███████╗██║  ██║
 *    ╚═╝  ╚═╝╚═╝     ╚═╝     ╚══════╝╚═╝       ╚═╝     ╚═╝╚══════╝╚═╝   ╚══════╝╚═╝  ╚═╝
 *    ███████╗██████╗  ██████╗ ███╗   ███╗    ███████╗████████╗██████╗ ██╗███╗   ██╗ ██████╗
 *    ██╔════╝██╔══██╗██╔═══██╗████╗ ████║    ██╔════╝╚══██╔══╝██╔══██╗██║████╗  ██║██╔════╝
 *    █████╗  ██████╔╝██║   ██║██╔████╔██║    ███████╗   ██║   ██████╔╝██║██╔██╗ ██║██║  ███╗
 *    ██╔══╝  ██╔══██╗██║   ██║██║╚██╔╝██║    ╚════██║   ██║   ██╔══██╗██║██║╚██╗██║██║   ██║
 *    ██║     ██║  ██║╚██████╔╝██║ ╚═╝ ██║    ███████║   ██║   ██║  ██║██║██║ ╚████║╚██████╔╝
 *    ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝
 *      _____  _  _  _
 *     |  ___|(_)| || |_  ___  _ __
 *     | |_   | || || __|/ _ \| '__|
 *     |  _|  | || || |_|  __/| |
 *     |_|    |_||_| \__|\___||_|  
 */

PARTICLE.filter('applyFilter', ['$filter', function ($filter) {
    return function (value, filters) {
        if (!filters) {
            return value;
        } else {
            var parts = filters.split(":");
            var filterName = parts[0];
            var params;
            if (parts[1]) {
                params = parts[1].split(":");
            }
            var filterFn = $filter(filterName);
            return filterFn.apply(filterFn, [value].concat(params));

        }
    };
}]);

/***
 *     ██████╗ █████╗ ██████╗ ██╗████████╗ █████╗ ██╗     ██╗███████╗███████╗
 *    ██╔════╝██╔══██╗██╔══██╗██║╚══██╔══╝██╔══██╗██║     ██║╚══███╔╝██╔════╝
 *    ██║     ███████║██████╔╝██║   ██║   ███████║██║     ██║  ███╔╝ █████╗
 *    ██║     ██╔══██║██╔═══╝ ██║   ██║   ██╔══██║██║     ██║ ███╔╝  ██╔══╝
 *    ╚██████╗██║  ██║██║     ██║   ██║   ██║  ██║███████╗██║███████╗███████╗
 *     ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝╚══════╝╚══════╝
 *      _____  _  _  _
 *     |  ___|(_)| || |_  ___  _ __
 *     | |_   | || || __|/ _ \| '__|
 *     |  _|  | || || |_|  __/| |
 *     |_|    |_||_| \__|\___||_|
 */

PARTICLE.filter('capitalize', function () {
    return function (input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
    };
});

/***
 *    ██████╗ ███████╗██████╗  ██████╗███████╗███╗   ██╗████████╗ █████╗  ██████╗ ███████╗
 *    ██╔══██╗██╔════╝██╔══██╗██╔════╝██╔════╝████╗  ██║╚══██╔══╝██╔══██╗██╔════╝ ██╔════╝
 *    ██████╔╝█████╗  ██████╔╝██║     █████╗  ██╔██╗ ██║   ██║   ███████║██║  ███╗█████╗
 *    ██╔═══╝ ██╔══╝  ██╔══██╗██║     ██╔══╝  ██║╚██╗██║   ██║   ██╔══██║██║   ██║██╔══╝
 *    ██║     ███████╗██║  ██║╚██████╗███████╗██║ ╚████║   ██║   ██║  ██║╚██████╔╝███████╗
 *    ╚═╝     ╚══════╝╚═╝  ╚═╝ ╚═════╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
 *      _____  _  _  _
 *     |  ___|(_)| || |_  ___  _ __
 *     | |_   | || || __|/ _ \| '__|
 *     |  _|  | || || |_|  __/| |
 *     |_|    |_||_| \__|\___||_|
 */

PARTICLE.filter('percent', function () {
    return function (value, param1) {
        return value.toFixed(param1) + "%";
    };
});

PARTICLE.filter('significantDigits', ['$filter', function ($filter) {
    return function (input, places) {
        if (isNaN(input)) return input;
        var digits = Math.min(input.toString().length, places);
        return Number(input).toPrecision(digits);
    };
}]);
// Came from the comments here:  https://gist.github.com/maruf-nc/5625869
PARTICLE.filter('titlecase', function() {
    return function (input) {
        var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

        input = input.toLowerCase();
        return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title) {
            if (index > 0 && index + match.length !== title.length &&
                match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
                (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
                title.charAt(index - 1).search(/[^\s-]/) < 0) {
                return match.toLowerCase();
            }

            if (match.substr(1).search(/[A-Z]|\../) > -1) {
                return match;
            }

            return match.charAt(0).toUpperCase() + match.substr(1);
        });
    };
});
/***
 *    ██╗     ██╗ ██████╗ ██╗   ██╗██╗██████╗     ███████╗██╗██╗     ██╗
 *    ██║     ██║██╔═══██╗██║   ██║██║██╔══██╗    ██╔════╝██║██║     ██║
 *    ██║     ██║██║   ██║██║   ██║██║██║  ██║    █████╗  ██║██║     ██║
 *    ██║     ██║██║▄▄ ██║██║   ██║██║██║  ██║    ██╔══╝  ██║██║     ██║
 *    ███████╗██║╚██████╔╝╚██████╔╝██║██████╔╝    ██║     ██║███████╗███████╗
 *    ╚══════╝╚═╝ ╚══▀▀═╝  ╚═════╝ ╚═╝╚═════╝     ╚═╝     ╚═╝╚══════╝╚══════╝
 *     ██████╗  █████╗ ██╗   ██╗ ██████╗ ███████╗
 *    ██╔════╝ ██╔══██╗██║   ██║██╔════╝ ██╔════╝
 *    ██║  ███╗███████║██║   ██║██║  ███╗█████╗
 *    ██║   ██║██╔══██║██║   ██║██║   ██║██╔══╝
 *    ╚██████╔╝██║  ██║╚██████╔╝╚██████╔╝███████╗
 *     ╚═════╝ ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝
 *      _   _  _    _  _  _  _
 *     | | | || |_ (_)| |(_)| |_  _   _
 *     | | | || __|| || || || __|| | | |
 *     | |_| || |_ | || || || |_ | |_| |
 *      \___/  \__||_||_||_| \__| \__, |
 *                                |___/
 *
 *    A utility for rendering animated liquid fill gauge graphics.
 */

/*!
 * @license Open source under BSD 2-clause (http://choosealicense.com/licenses/bsd-2-clause/)
 * Copyright (c) 2015, Curtis Bratton
 * All rights reserved.
 *
 * Liquid Fill Gauge v1.1
 */
function liquidFillGaugeDefaultSettings(){
    return {
        minValue: 0, // The gauge minimum value.
        maxValue: 100, // The gauge maximum value.
        circleThickness: 0.1, // The outer circle thickness as a percentage of it's radius.
        circleFillGap: 0.02, // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
        circleColor: "#178BCA", // The color of the outer circle.
        waveHeight: 0.05, // The wave height as a percentage of the radius of the wave circle.
        waveCount: 1, // The number of full waves per width of the wave circle.
        waveRiseTime: 1000, // The amount of time in milliseconds for the wave to rise from 0 to it's final height.
        waveAnimateTime: 18000, // The amount of time in milliseconds for a full wave to enter the wave circle.
        waveRise: true, // Control if the wave should rise from 0 to it's full height, or start at it's full height.
        waveHeightScaling: true, // Controls wave size scaling at low and high fill percentages. When true, wave height reaches it's maximum at 50% fill, and minimum at 0% and 100% fill. This helps to prevent the wave from making the wave circle from appear totally full or empty when near it's minimum or maximum fill.
        waveAnimate: true, // Controls if the wave scrolls or is static.
        waveColor: "#178BCA", // The color of the fill wave.
        waveOffset: 0, // The amount to initially offset the wave. 0 = no offset. 1 = offset of one full wave.
        textVertPosition: 0.5, // The height at which to display the percentage text withing the wave circle. 0 = bottom, 1 = top.
        textSize: 1, // The relative height of the text to display in the wave circle. 1 = 50%
        valueCountUp: true, // If true, the displayed value counts up from 0 to it's final value upon loading. If false, the final value is displayed.
        displayPercent: true, // If true, a % symbol is displayed after the value.
        textColor: "#fff", // The color of the value text when the wave does not overlap it.
        waveTextColor: "rgba(255,255,255,.5)" // The color of the value text when the wave overlaps it.
    };
}

function loadLiquidFillGauge(elementId, value, config) {
    if(config === undefined) config = liquidFillGaugeDefaultSettings();

    var gauge = d3.select("#" + elementId);
    var radius = Math.min(parseInt(gauge.style("width")), parseInt(gauge.style("height")))/2;
    var locationX = parseInt(gauge.style("width"))/2 - radius;
    var locationY = parseInt(gauge.style("height"))/2 - radius;
		  console.log(config);
    var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value))/config.maxValue;

    var waveHeightScale;
    if(config.waveHeightScaling){
        waveHeightScale = d3.scale.linear()
            .range([0,config.waveHeight,0])
            .domain([0,50,100]);
    } else {
        waveHeightScale = d3.scale.linear()
            .range([config.waveHeight,config.waveHeight])
            .domain([0,100]);
    }

    var textPixels = (config.textSize*radius/2);
    var textFinalValue = parseFloat(value).toFixed(2);
    var textStartValue = config.valueCountUp?config.minValue:textFinalValue;
    var percentText = config.displayPercent?"%":"";
    var circleThickness = config.circleThickness * radius;
    var circleFillGap = config.circleFillGap * radius;
    var fillCircleMargin = circleThickness + circleFillGap;
    var fillCircleRadius = radius - fillCircleMargin;
    var waveHeight = fillCircleRadius*waveHeightScale(fillPercent*100);

    var waveLength = fillCircleRadius*2/config.waveCount;
    var waveClipCount = 1+config.waveCount;
    var waveClipWidth = waveLength*waveClipCount;

    // Rounding functions so that the correct number of decimal places is always displayed as the value counts up.
    var textRounder = function(value){ return Math.round(value); };
    if(parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))){
        textRounder = function(value){ return parseFloat(value).toFixed(1); };
    }
    if(parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))){
        textRounder = function(value){ return parseFloat(value).toFixed(2); };
    }

    // Data for building the clip wave area.
    var data = [];
    for(var i = 0; i <= 40*waveClipCount; i++){
        data.push({x: i/(40*waveClipCount), y: (i/(40))});
    }

    // Scales for drawing the outer circle.
    var gaugeCircleX = d3.scale.linear().range([0,2*Math.PI]).domain([0,1]);
    var gaugeCircleY = d3.scale.linear().range([0,radius]).domain([0,radius]);

    // Scales for controlling the size of the clipping path.
    var waveScaleX = d3.scale.linear().range([0,waveClipWidth]).domain([0,1]);
    var waveScaleY = d3.scale.linear().range([0,waveHeight]).domain([0,1]);

    // Scales for controlling the position of the clipping path.
    var waveRiseScale = d3.scale.linear()
        // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
        // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
        // circle at 100%.
        .range([(fillCircleMargin+fillCircleRadius*2+waveHeight),(fillCircleMargin-waveHeight)])
        .domain([0,1]);
    var waveAnimateScale = d3.scale.linear()
        .range([0, waveClipWidth-fillCircleRadius*2]) // Push the clip area one full wave then snap back.
        .domain([0,1]);

    // Scale for controlling the position of the text within the gauge.
    var textRiseScaleY = d3.scale.linear()
        .range([fillCircleMargin+fillCircleRadius*2,(fillCircleMargin+textPixels*0.7)])
        .domain([0,1]);

    // Center the gauge within the parent SVG.
    var gaugeGroup = gauge.append("g")
        .attr('transform','translate('+locationX+','+locationY+')');

    // Draw the outer circle.
    var gaugeCircleArc = d3.svg.arc()
        .startAngle(gaugeCircleX(0))
        .endAngle(gaugeCircleX(1))
        .outerRadius(gaugeCircleY(radius))
        .innerRadius(gaugeCircleY(radius-circleThickness));
    gaugeGroup.append("path")
        .attr("d", gaugeCircleArc)
        .attr("class", 'fill-color-0')
        .attr('transform','translate('+radius+','+radius+')');

    // Text where the wave does not overlap.
    var text1 = gaugeGroup.append("text")
        .text(textRounder(textStartValue) + percentText)
        .attr("class", "liquidFillGaugeText")
        .attr("text-anchor", "middle")
        .attr("font-size", textPixels + "px")
        .style("fill", config.textColor)
        .attr('transform','translate('+radius+','+textRiseScaleY(config.textVertPosition)+')');

    // The clipping wave area.
    var clipArea = d3.svg.area()
        .x(function(d) { return waveScaleX(d.x); } )
        .y0(function(d) { return waveScaleY(Math.sin(Math.PI*2*config.waveOffset*-1 + Math.PI*2*(1-config.waveCount) + d.y*2*Math.PI));} )
        .y1(function(d) { return (fillCircleRadius*2 + waveHeight); } );
    var waveGroup = gaugeGroup.append("defs")
        .append("clipPath")
        .attr("id", "clipWave" + elementId);
    var wave = waveGroup.append("path")
        .datum(data)
        .attr("d", clipArea)
        .attr("T", 0);

    // The inner circle with the clipping wave attached.
    var fillCircleGroup = gaugeGroup.append("g")
        .attr("clip-path", "url(#clipWave" + elementId + ")");
    fillCircleGroup.append("circle")
        .attr("cx", radius)
        .attr("cy", radius)
        .attr("r", fillCircleRadius)
        .attr("class", 'fill-color-1');

    // Text where the wave does overlap.
    var text2 = fillCircleGroup.append("text")
        .text(textRounder(textStartValue) + percentText)
        .attr("class", "liquidFillGaugeText")
        .attr("text-anchor", "middle")
        .attr("font-size", textPixels + "px")
        .style("fill", config.waveTextColor)
        .attr('transform','translate('+radius+','+textRiseScaleY(config.textVertPosition)+')');

    // Make the value count up.
    if(config.valueCountUp){
        var textTween = function(){
            var i = d3.interpolate(this.textContent, textFinalValue);
            return function(t) { this.textContent = textRounder(i(t)) + percentText; };
        };
        text1.transition()
            .duration(config.waveRiseTime)
            .tween("text", textTween);
        text2.transition()
            .duration(config.waveRiseTime)
            .tween("text", textTween);
    }

    // Make the wave rise. wave and waveGroup are separate so that horizontal and vertical movement can be controlled independently.
    var waveGroupXPosition = fillCircleMargin+fillCircleRadius*2-waveClipWidth;
    if(config.waveRise){
        waveGroup.attr('transform','translate('+waveGroupXPosition+','+waveRiseScale(0)+')')
            .transition()
            .duration(config.waveRiseTime)
            .attr('transform','translate('+waveGroupXPosition+','+waveRiseScale(fillPercent)+')')
            .each("start", function(){ wave.attr('transform','translate(1,0)'); }); // This transform is necessary to get the clip wave positioned correctly when waveRise=true and waveAnimate=false. The wave will not position correctly without this, but it's not clear why this is actually necessary.
    } else {
        waveGroup.attr('transform','translate('+waveGroupXPosition+','+waveRiseScale(fillPercent)+')');
    }

    if(config.waveAnimate) animateWave();

    function animateWave() {
        wave.attr('transform','translate('+waveAnimateScale(wave.attr('T'))+',0)');
        wave.transition()
            .duration(config.waveAnimateTime * (1-wave.attr('T')))
            .ease('linear')
            .attr('transform','translate('+waveAnimateScale(1)+',0)')
            .attr('T', 1)
            .each('end', function(){
                wave.attr('T', 0);
                animateWave(config.waveAnimateTime);
            });
    }

    function GaugeUpdater(){
        this.update = function(value){
            var newFinalValue = parseFloat(value).toFixed(2);
            var textRounderUpdater = function(value){ return Math.round(value); };
            if(parseFloat(newFinalValue) != parseFloat(textRounderUpdater(newFinalValue))){
                textRounderUpdater = function(value){ return parseFloat(value).toFixed(1); };
            }
            if(parseFloat(newFinalValue) != parseFloat(textRounderUpdater(newFinalValue))){
                textRounderUpdater = function(value){ return parseFloat(value).toFixed(2); };
            }

            var textTween = function(){
                var i = d3.interpolate(this.textContent, parseFloat(value).toFixed(2));
                return function(t) { this.textContent = textRounderUpdater(i(t)) + percentText; };
            };

            text1.transition()
                .duration(config.waveRiseTime)
                .tween("text", textTween);
            text2.transition()
                .duration(config.waveRiseTime)
                .tween("text", textTween);

            var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value))/config.maxValue;
            var waveHeight = fillCircleRadius*waveHeightScale(fillPercent*100);
            var waveRiseScale = d3.scale.linear()
                // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
                // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
                // circle at 100%.
                .range([(fillCircleMargin+fillCircleRadius*2+waveHeight),(fillCircleMargin-waveHeight)])
                .domain([0,1]);
            var newHeight = waveRiseScale(fillPercent);
            var waveScaleX = d3.scale.linear().range([0,waveClipWidth]).domain([0,1]);
            var waveScaleY = d3.scale.linear().range([0,waveHeight]).domain([0,1]);
            var newClipArea;
            if(config.waveHeightScaling){
                newClipArea = d3.svg.area()
                    .x(function(d) { return waveScaleX(d.x); } )
                    .y0(function(d) { return waveScaleY(Math.sin(Math.PI*2*config.waveOffset*-1 + Math.PI*2*(1-config.waveCount) + d.y*2*Math.PI));} )
                    .y1(function(d) { return (fillCircleRadius*2 + waveHeight); } );
            } else {
                newClipArea = clipArea;
            }

            var newWavePosition = config.waveAnimate?waveAnimateScale(1):0;
            wave.transition()
                .duration(0)
                .transition()
                .duration(config.waveAnimate?(config.waveAnimateTime * (1-wave.attr('T'))):(config.waveRiseTime))
                .ease('linear')
                .attr('d', newClipArea)
                .attr('transform','translate('+newWavePosition+',0)')
                .attr('T','1')
                .each("end", function(){
                    if(config.waveAnimate){
                        wave.attr('transform','translate('+waveAnimateScale(0)+',0)');
                        animateWave(config.waveAnimateTime);
                    }
                });
            waveGroup.transition()
                .duration(config.waveRiseTime)
                .attr('transform','translate('+waveGroupXPosition+','+newHeight+')');
        };
    }

    return new GaugeUpdater();
}
