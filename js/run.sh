#!/bin/bash
# 用来测试不同阶段的时间，例如；make "test^js^step0"
exec js $(dirname $0)/${STEP:-stepA_mal}.js "${@}"