sap.ui.jsview("rpi.RPI", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	*/ 
	getControllerName : function() {
		return "rpi.RPI";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	*/ 
	createContent : function(oController) {
		var oPanel = new sap.ui.commons.Panel().setText('Door Sensor Status');
		

		
		jQuery.sap.require("sap.ui.core.IconPool");
			    
		
	    oController.oModel = new sap.ui.model.odata.ODataModel("../sensor/service/RPISensor.xsodata",true, "userid", "password");
	    oController.oModel.setHeaders({"content-type" : "application/json;charset=UTF-8"}); 

	    
	    //Define Table (needs sap.ui.table)
		var oTable = new sap.ui.table.Table("RPI", {tableId: "RPIId",visibleRowCount: 10, 
			toolbar: new sap.ui.commons.Toolbar({items: [ 
			new sap.ui.commons.Button({text: "Refresh Data", press: function() { oController.oModel.refresh(); } })
			]})
		});  
		
		var oControl;  
		var vCol;
		// ADD COLUMNS
		//Prepare column to easily allow formating etc
		vCol = "STIMESTAMP";
		oControl = new sap.ui.commons.TextField({editable:false}).bindProperty("value",vCol);  
		//Add
		oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "Timestamp" }), 
            template: oControl,   
            sortProperty: vCol,  
            filterProperty: vCol 
                      }));  
		
		vCol = "STATUS"; 
		oControl = new sap.ui.commons.TextField({editable:false}).bindProperty("value",vCol);  
		//Add
		oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "Door Status" }), 
            template: oControl,   
            sortProperty: vCol,  
            filterProperty: vCol 
                      }));  

		
		//Sort Table
		oTable.sort(oTable.getColumns()[0]);
		
		//Prepare output
		oTable.setModel(oController.oModel);   
		oTable.bindRows("/RpiSensor");   
		oPanel.addContent(oTable);
		
		return oPanel;
		
		
		
	}

});
