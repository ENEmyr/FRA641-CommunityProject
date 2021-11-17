// More on defining blocks:
// https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks

import * as Blockly from "blockly/core";

// Start Block
Blockly.Blocks["start"] = {
  init: function() {
    this.appendDummyInput().appendField("Start");
    this.appendStatementInput("START");
    this.setColour(220);
    this.setTooltip("Start");
    this.setHelpUrl("https://dogmatism.me");
  },
};

Blockly.JavaScript["start"] = function(block) {
  const commands = Blockly.JavaScript.statementToCode(block, "START");
  let code = `START;${commands.replace(/\s/g, '')}`;
  return code;
};

//Rotate Base Block
Blockly.Blocks['rotate_base'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage("https://i.imgur.com/9LzzaLa.png", 30, 30, { alt: "Robotic Arm Base", flipRtl: "FALSE" }))
      .appendField("Rotate base")
      .appendField(new Blockly.FieldAngle(0), "rotate_base_degree");
    this.appendValueInput("rotate_base_direction")
      .setCheck("String")
      .appendField("to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(240);
    this.setTooltip("Rotate base");
    this.setHelpUrl("https://dogmatism.me");
  }
};

Blockly.JavaScript['rotate_base'] = function(block) {
  let angle_rotate_base_degree = block.getFieldValue('rotate_base_degree');
  let value_rotate_base_direction = Blockly.JavaScript.valueToCode(block, 'rotate_base_direction', Blockly.JavaScript.ORDER_ATOMIC);
  if (!['LEFT', 'RIGHT'].includes(value_rotate_base_direction)) value_rotate_base_direction = 'ERR_VALUE_MISMATCH_ROTATE_BASE';
  if (angle_rotate_base_degree > 180 || angle_rotate_base_degree < 0) angle_rotate_base_degree = 'ERR_INVALID_RANGE_ROTATE_BASE';
  const code = `ROTATE_BASE(${value_rotate_base_direction},${angle_rotate_base_degree});`;
  return code;
};

//Rotate Upper Arm Block
Blockly.Blocks['rotate_upper_arm'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage("https://i.imgur.com/X1X8Qgg.png", 30, 30, { alt: "Robotic Arm", flipRtl: "FALSE" }))
      .appendField("Rotate upper arm")
      .appendField(new Blockly.FieldAngle(0), "rotate_upper_arm_degree");
    // this.appendValueInput("rotate_upper_arm_direction")
    //   .setCheck("String")
    //   .appendField("to");
    // this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(315);
    this.setTooltip("Rotate upper arm");
    this.setHelpUrl("https://dogmatism.me");
  }
};

Blockly.JavaScript['rotate_upper_arm'] = function(block) {
  let angle_rotate_upper_arm_degree = block.getFieldValue('rotate_upper_arm_degree');
  // let value_rotate_upper_arm_direction = Blockly.JavaScript.valueToCode(block, 'rotate_upper_arm_direction', Blockly.JavaScript.ORDER_ATOMIC);
  // if (!['UP', 'DOWN'].includes(value_rotate_upper_arm_direction)) value_rotate_upper_arm_direction = 'ERR_VALUE_MISMATCH_UPPER_ARM';
  if (angle_rotate_upper_arm_degree > 90 || angle_rotate_upper_arm_degree < 0) angle_rotate_upper_arm_degree = 'ERR_INVALID_RANGE_UPPER_ARM';
  // const code = `ROTATE_UPPER_ARM(${value_rotate_upper_arm_direction},${angle_rotate_upper_arm_degree});`;
  const code = `ROTATE_UPPER_ARM(${angle_rotate_upper_arm_degree});`;
  return code;
};

//Rotate Lower Arm Block
Blockly.Blocks['rotate_lower_arm'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage("https://i.imgur.com/X1X8Qgg.png", 30, 30, { alt: "Robotic Arm", flipRtl: "FALSE" }))
      .appendField("Rotate lower arm")
      .appendField(new Blockly.FieldAngle(0), "rotate_lower_arm_degree");
    // this.appendValueInput("rotate_lower_arm_direction")
    //   .setCheck("String")
    //   .appendField("to");
    // this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(325);
    this.setTooltip("Rotate lower arm");
    this.setHelpUrl("https://dogmatism.me");
  }
};

Blockly.JavaScript['rotate_lower_arm'] = function(block) {
  let angle_rotate_lower_arm_degree = block.getFieldValue('rotate_lower_arm_degree');
  // let value_rotate_lower_arm_direction = Blockly.JavaScript.valueToCode(block, 'rotate_lower_arm_direction', Blockly.JavaScript.ORDER_ATOMIC);
  // if (!['UP', 'DOWN'].includes(value_rotate_lower_arm_direction)) value_rotate_lower_arm_direction = 'ERR_VALUE_MISMATCH_LOWER_ARM';
  if (angle_rotate_lower_arm_degree > 90 || angle_rotate_lower_arm_degree < 0) angle_rotate_lower_arm_degree = 'ERR_INVALID_RANGE_LOWER_ARM';
  // const code = `ROTATE_UPPER_ARM(${value_rotate_lower_arm_direction},${angle_rotate_lower_arm_degree});`;
  const code = `ROTATE_LOWER_ARM(${angle_rotate_lower_arm_degree});`;
  return code;
};

//Open/Close Gripper Block
Blockly.Blocks['gripper'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage("https://i.imgur.com/qgLtzif.png", 30, 30, { alt: "Gripper", flipRtl: "FALSE" }))
      .appendField(new Blockly.FieldDropdown([["Open", "OPEN_GRIPPER"], ["Close", "CLOSE_GRIPPER"], ["", ""]]), "cmd_gripper")
      .appendField("gripper");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
    this.setTooltip("Rotate upper arm");
    this.setHelpUrl("https://dogmatism.me");
  }
};

Blockly.JavaScript['gripper'] = function(block) {
  const dropdown_cmd_gripper = block.getFieldValue('cmd_gripper');
  const code = `COMMAND_GRIPPER(${dropdown_cmd_gripper});`;
  return code;
};

// Direction Right Block
Blockly.Blocks['direction_r'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Right");
    this.setOutput(true, "String");
    this.setColour(45);
    this.setTooltip("Direction");
    this.setHelpUrl("https://dogmatism.me");
  }
};

Blockly.JavaScript['direction_r'] = function() {
  const code = 'RIGHT';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

//Direction Left Block
Blockly.Blocks['direction_l'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Left");
    this.setOutput(true, "String");
    this.setColour(90);
    this.setTooltip("Direction");
    this.setHelpUrl("https://dogmatism.me");
  }
};

Blockly.JavaScript['direction_l'] = function() {
  const code = 'LEFT';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

//Direction Up Block
Blockly.Blocks['direction_u'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Up");
    this.setOutput(true, "String");
    this.setColour(135);
    this.setTooltip("Direction");
    this.setHelpUrl("https://dogmatism.me");
  }
};

Blockly.JavaScript['direction_u'] = function() {
  const code = 'UP';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

//Direction Down Block
Blockly.Blocks['direction_d'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Down");
    this.setOutput(true, "String");
    this.setColour(180);
    this.setTooltip("Direction");
    this.setHelpUrl("https://dogmatism.me");
  }
};

Blockly.JavaScript['direction_d'] = function() {
  const code = 'DOWN';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

//End Block

Blockly.Blocks['end'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("End");
    this.setPreviousStatement(true, null);
    this.setColour(270);
    this.setTooltip("End Program");
    this.setHelpUrl("https://dogmatism.me");
  }
};

Blockly.JavaScript['end'] = function() {
  const code = 'END;';
  return code;
};


// Move robotic block

// Blockly.Blocks["move_robotic_arm"] = {
//   init: function () {
//     this.appendDummyInput()
//       .appendField("Move Robotic Arm to")
//       .appendField(
//         new Blockly.FieldDropdown([
//           ["up", "UP"],
//           ["down", "DOWN"],
//           ["left", "LEFT"],
//           ["right", "RIGHT"],
//         ]),
//         "MODE"
//       );
//     this.appendValueInput("Distance")
//       .setCheck("Number")
//       .appendField("with distance");
//     this.setInputsInline(true);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, "String");
//     this.setColour(150);
//     this.setTooltip("Move");
//     this.setHelpUrl("https://dogmatism.me");
//   },
// };

// Blockly.JavaScript["move_robotic_arm"] = function (block) {
//   const distanceUnit = Blockly.JavaScript.valueToCode(
//     block,
//     "Distance",
//     Blockly.JavaScript.ORDER_ATOMIC
//   );
//   const moveTo = block.getFieldValue("MODE");
//   const code = `move(${moveTo},${distanceUnit});`;
//   return code;
// };
