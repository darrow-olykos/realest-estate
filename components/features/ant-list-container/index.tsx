import React from 'react'
import { createComputeContainer } from '../../utils/create-compute-container'
import { AntList } from './ant-list'
import { AntProps } from './ant'

import { generateAntWinLikelihoodCalculator } from './ant/generate-ant-win-likelihood-calculator'

export const AntListContainer: React.VFC = () => {
  let AntComputeContainer = createComputeContainer<AntProps>()
  return (
    <AntComputeContainer
      entityName="ant"
      overrideId="name"
      url="/api/ants"
      componentToRender={AntList}
      computeForEach={async (item) => {
        return new Promise((resolve, _reject) => {
          generateAntWinLikelihoodCalculator()((priority) => {
            resolve(priority)
          })
        })
      }}
    />
  )
}

