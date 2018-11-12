
/*Singleton*/

var factory = (function (){
  var instance;
  function createInstance() {
    var appointments = [];
    var records = [];
    var names = null;
    var todaysAppointments = [];
    function getNames(){
      return this.names;
    }
    return{
      setAppointments: function(data){
        this.appointments = data;
      },
      setNames: function(data){
        this.names = data;
      },
      setRecords: function(data){
        this.records = data;
      },
      addAppointment: function(data){
        this.appointments.push(data);
      },
    };
  }

  return {
      getInstance: function () {
          if (!instance) {
              instance = createInstance();
          }
          return instance;
      }
  };
})();




export default factory;
