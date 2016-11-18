/**
 * Created by chuck on 2016/11/18.
 */

var Asset = Model.create();
var User = Model.create();

var user = User.init();

/**/
assertEqual(typeof Asset.find, "function");

// var asset = Asset.init({name: "foo.png"});
/*var asset = Asset.init();
console.log(asset);
asset.name = "same, same";
asset.id = 1;
asset.save();

var asset2 = Asset.init();
asset2.name = "but different";
asset2.id = 2;
asset2.save();

console.log(asset);
console.log(asset2);
assertEqual(Asset.find(1).name, "same, same");*/


var asset = Asset.init();
asset.save();
console.log(asset.id);
// asset2.destroy();
/**/