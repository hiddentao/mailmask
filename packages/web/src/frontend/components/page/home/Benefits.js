import React from 'react'
import styled from '@emotion/styled'
import { flex, boxShadow } from 'emotion-styled-utils'

import SvgImage from '../../SvgImage'
import Logo from '../../Logo'
import { SelfHostingLink } from '../../Link'

const BENEFIT_SIZE = 250
const BENEFIT_CIRCLE_RADIUS = 300
const BENEFIT_ANGLE = (360 / 6)
const BENEFIT_INITIAL_ANGLE_OFFSET = 10

const Container = styled.div`
  position: relative;
  height: auto;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    height: ${2 * BENEFIT_CIRCLE_RADIUS + BENEFIT_SIZE}px;
  }
`

const BenefitsCentreLogo = styled.section`
  display: none;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    ${flex({ direction: 'column', justify: 'center', align: 'center' })};
    width: ${BENEFIT_SIZE / 2}px;
    height: ${BENEFIT_SIZE / 2}px;
    border-radius: ${BENEFIT_SIZE / 2}px;
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 2rem;
    transform: translateX(-50%) translateY(-50%);

    background-color: ${({ theme }) => theme.homePage.benefit.logo.bgColor};
    ${({ theme }) => boxShadow({ color: theme.homePage.benefit.logo.shadowColor })};
  }
`

const BenefitLine = styled.span`
  display: none;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    display: block;
    width: ${BENEFIT_CIRCLE_RADIUS / 2}px;
    height: 1px;
    border: 2px dashed ${({ theme }) => theme.homePage.benefit.arcLine.color};
  }
`

const Benefit = styled.div`
  ${flex({ direction: 'column', justify: 'center', align: 'center' })};
  ${({ theme }) => theme.font('body')};
  padding: 2rem;
  text-align: center;
  font-size: 1rem;
  line-height: 1.3em;
  margin: 2rem auto 0;

  border: 1px solid ${({ theme }) => theme.homePage.benefit.block.borderColor};
  background-color: ${({ theme }) => theme.homePage.benefit.block.bgColor};
  color: ${({ theme }) => theme.homePage.benefit.block.textColor};
  ${({ theme }) => boxShadow({ color: theme.homePage.benefit.block.shadowColor })};

  svg {
    fill: ${({ theme }) => theme.homePage.benefit.block.textColor};
  }

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    position: absolute;
    transform: translateX(-50%) translateY(-50%);
    margin: 0;

    width: ${BENEFIT_SIZE}px;
    height: ${BENEFIT_SIZE}px;
    border-radius: ${BENEFIT_SIZE}px;

    ${() => {
    let str = ''
    let i = 1
    let angle = BENEFIT_INITIAL_ANGLE_OFFSET + BENEFIT_ANGLE * 3
    while (6 >= i) {
      str += `
        &:nth-of-type(${i}) {
          top: calc(${Math.sin(angle * Math.PI / 180) * BENEFIT_CIRCLE_RADIUS}px + 50%);
          left: calc(${Math.cos(angle * Math.PI / 180) * BENEFIT_CIRCLE_RADIUS}px + 50%);

          span {
            position: absolute;
            top: ${BENEFIT_SIZE / 2}px;
            left: ${BENEFIT_SIZE / 2}px;
            transform: rotate(${angle + 180}deg) translateX(${BENEFIT_CIRCLE_RADIUS / 2}px);
            transform-origin: 0 0;
          }
        }
      `
      i += 1
      angle += BENEFIT_ANGLE
    }
    return str
  }};
  }

  p {
    margin-top: 1rem;
  }
`

const BenefitImage = ({ src, ...props }) => {
  return (
    <SvgImage src={src} viewBox='0 0 512 512' width='74' height='74' {...props }/>
  )
}


const Benefits = ({ className }) => {
  return (
    <Container className={className}>
      <Benefit>
        <BenefitLine />
        <BenefitImage src='ninjaMask' />
        <p>Keep your real email address private forever.</p>
      </Benefit>
      <Benefit>
        <BenefitLine />
        <BenefitImage src='stopHand' />
        <p>Stop spam with just one click.</p>
      </Benefit>
      <Benefit>
        <BenefitLine />
        <BenefitImage src='eye' />
        <p>Know when your email address gets shared.</p>
      </Benefit>
      <Benefit>
        <BenefitLine />
        <BenefitImage src='coding' />
        <p>Open source, can be <SelfHostingLink>self-hosted</SelfHostingLink>.</p>
      </Benefit>
      <Benefit>
        <BenefitLine />
        <BenefitImage src='textbox' />
        <p> Create aliases as you type, no software needed.</p>
      </Benefit>
      <Benefit>
        <BenefitLine />
        <BenefitImage src='attachmentEmail' />
        <p>All email types, including large attachments, etc.</p>
      </Benefit>
      <BenefitsCentreLogo>
        <Logo />
      </BenefitsCentreLogo>
    </Container>
  )
}

export default Benefits
