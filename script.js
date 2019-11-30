$("#input1").val("");
$("#output1").val("");
var btnCalculate = document.getElementById("calculate");
btnCalculate.addEventListener("click", getConversion);

    var exchangeRate = {};

$(document).ready(function(){
    getCurrencyList();
  });

//function for getting currency list and conversion rates from server using API//
function getCurrencyList()
{
    var result = null
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://www.apilayer.net/api/list?access_key=fe6b1e7c7a96bdd802ae25b51905ccd9');
    xhr.send();
    xhr.onload = function()
    {
        if(xhr.status == 200)
        {  
            //alert(result)
            result = JSON.parse(xhr.response);
            // console.log(result)
            appendCurrency(result);
        }
        else
        {
            console.log("Error code is:"+xhr.status);
        }
    }

   

    var result1 =null
    var xhr1 = new XMLHttpRequest();
    xhr1.open('GET', 'http://www.apilayer.net/api/live?access_key=fe6b1e7c7a96bdd802ae25b51905ccd9');
    xhr1.send();
    xhr1.onload = function()
    {
        if(xhr1.status == 200)
        {
            result1 = JSON.parse(xhr1.response);
            exchangeRate = result1.quotes;
          // console.log(exchangeRate);
        }
        else
        {
            console.log("Error code is:"+ xhr.status);
        }
    }
}


//appending the fetched data to input and output select boxes//
 function appendCurrency(input)
 {
     var currencyList = input.currencies
     for(key in currencyList)
     {
         //console.log(key);
     $("#inputCurrency").append("<option value =" + key + ">"+ key + " "+ currencyList[key] + "</option>");
    }

    for(key in currencyList)
     {
     $("#outputCurrency").append("<option value =" + key + ">" + key + " "+ currencyList[key] + "</option>");
    }
 }
  
//  performing operations //
  function getConversion()
  {
    var fromCurrency = document.getElementById("inputCurrency").value;
    var toCurrency = document.getElementById("outputCurrency").value;
    
     event.preventDefault();
      
      
      var inputValue = document.getElementById('input1').value;
      var outputValue, temp1, temp2;
      var str = "";
      var str1 = "";
      str = "USD" + fromCurrency;
      str1 = "USD" + toCurrency;
      for(key in exchangeRate)
      {
          //console.log(key)
          if(key === str)
          {
             temp1 = exchangeRate[key];
             console.log(temp1)
              temp1 = temp1.toFixed(6);
          }
          if(key === str1)
          {
            temp2 = exchangeRate[key];
             temp2 = temp2.toFixed(6);
             console.log(temp2)
          }
      }
     

      outputValue=(temp2/temp1)*parseInt(inputValue)
      outputValue=outputValue.toFixed(6)
      console.log(outputValue)

      $("#output1").val(outputValue);

}

 
  
