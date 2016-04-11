# damson-core

## Information

<table>
<tr> 
<td>Package</td><td>damson-core</td>
</tr>
<tr>
<td>Description</td>
<td>Damson core</td>
</tr>
</table>

## registerDriver(Driver, name, options)

Registers output driver.
- Driver should be constructor function.
- Driver.prototype.send should be implemented.

```javascript
var damson = require('damson-core')
var FileDriver = require('damson-driver-file');

damson.registerDriver(FileDriver, 'file', {
	filepath: 'temp.txt'
});
```

## getDriver(name)

Returns registered driver by its name

```javascript
var fileDriver = damson.getDriver('file');
fileDriver.setFilePath('temp2.txt');
```

## getDriverNames()

Returns registered driver names

```javascript
var driverNames = damson.getDriverNames();
```

## registerTask(Task, name, options)

Registers task
- Task should be constructor function.
- Task.prototype.run should be implemented.

```javascript
var damson = require('damson-core')
var SendMessage = require('damson-send-message');

damson.registerTask(SendMessage, 'send');
```

## getTask(name)

Returns registered task by its name

```javascript
var sendMessage = damson.getTask('send');
```

## getTaskNames()

Returns registered task names

```javascript
var taskNames = damson.getTaskNames();
```

## run(task_name, options, driver_name)

Runs task with selected driver

```javascript
var promise = damson.run('send', { message: 'Hello!' }, 'file');
promise.then(function () {
	console.log('Success');
});
```