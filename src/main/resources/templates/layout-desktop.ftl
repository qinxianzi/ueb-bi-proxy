<style type="text/css">
	/*#prism-mainview .pane-collapser .pcol-tri{
		background:none;
	}
	#prism-mainview .pane-collapser .pcol-thumb{
		background:none;
	}*/
</style>
<div id="prism-window" data-ng-controller="windowbase.controllers.window">
    <div data-ui-view="rightview" id="prism-rightview" data-ng-style="sizing.rightpane"></div>
    <div data-ui-view="mainview" id="prism-mainview" data-ng-style="sizing.midpane"></div>
</div> 