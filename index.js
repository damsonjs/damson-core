'use strict';

var log = require('damson-util').log;

/**
 * Registers output driver
 * @param {Function} Driver Damson driver constructor 
 * @param {string} name Damson driver name
 * @param {object} options Damson driver options
 */
function registerDriver(Driver, name, options) {
  if (this.drivers[name]) {
    log.error(new Error('Driver "' + name + '" is already registered.'));
    return;
  }
  if (!Driver || !Driver.prototype || typeof Driver.prototype.send !== 'function') {
    log.error(new Error('Driver "' + name + '" should implement "send" method.'));
    return;
  }
  this.drivers[name] = new Driver(options || {});
}

/**
 * Returns registered driver
 * @param {string} name Registered driver name
 * @return {object|null} Damson driver object
 */
function getDriver(name) {
  if (!this.drivers[name]) {
    log.error(new Error('Driver "' + name + '" is not registered.'));
    return null;
  }
  return this.drivers[name];
}

/** 
 * Returns registered driver names
 * @return {Array} Registered driver names
 */
function getDriverNames() {
  return Object.keys(this.drivers);
}

/**
 * Registers damson Task
 * @param {Function} Task Damson task constructor 
 * @param {string} name Damson task name
 * @param {object} options Damson task options
 */
function registerTask(Task, name, options) {
  if (this.tasks[name]) {
    log.error(new Error('Task "' + name + '" is already registered.'));
    return;
  }
  if (!Task || !Task.prototype || typeof Task.prototype.run !== 'function') {
    log.error(new Error('Task "' + name + '" should implement "run" method.'));
    return;
  }
  this.tasks[name] = new Task(options || []);
}

/**
 * Returns registered task
 * @param {string} name Registered task name
 * @return {object|null} Damson task object
 */
function getTask(name) {
  if (!this.tasks[name]) {
    log.error(new Error('Task "' + name + '" is not registered.'));
    return null;
  }
  return this.tasks[name];
}

/** 
 * Returns registered task names
 * @return {Array} Registered task names
 */
function getTaskNames() {
  return Object.keys(this.tasks);
}

/**
 * Runs task through selected driver
 * @param {string} task_name registered task name
 * @param {object} options task options
 * @param {string} driver_name registered driver name
 * @return {Promise}
 */
function run(task_name, options, driver_name) {
  var task = this.tasks[task_name];
  if (!task) {
    log.error(new Error('Task "' + task_name + '" is not registered.'));
    return;
  }
  var driver = this.drivers[driver_name];
  if (!driver) {
    log.error(new Error('Driver "' + driver_name + '" is not registered.'));
    return;
  }

  return task.run(driver, options);
}


function Damson() {
  this.tasks = [];
  this.drivers = [];
}

Damson.prototype.registerDriver = registerDriver;
Damson.prototype.getDriver = getDriver;
Damson.prototype.getDriverNames = getDriverNames;
Damson.prototype.registerTask = registerTask;
Damson.prototype.getTask = getTask;
Damson.prototype.getTaskNames = getTaskNames;
Damson.prototype.run = run;

var damson = new Damson();
module.exports = damson;