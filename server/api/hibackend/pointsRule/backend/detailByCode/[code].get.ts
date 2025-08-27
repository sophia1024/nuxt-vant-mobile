export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code')

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))

  // Mock points rule data
  const pointsRule = {
    pointsRuleId: '1',
    ruleCode: code || 'scan_register',
    ruleName: '扫码注册',
    pointsValue: 20,
    maxTimes: null,
    timesPerDay: 1,
    maxPointsValue: 20,
    operate: 0,
    updatedName: null,
    hasEnable: null,
    hasHide: null,
    ruleCategory: 'register',
    ruleCategoryDesc: 'register',
    ruleTaskName: null,
    enable: true,
    remainderTimesPerDay: 1,
  }

  return {
    code: 200,
    msg: 'success',
    data: pointsRule,
  }
})
