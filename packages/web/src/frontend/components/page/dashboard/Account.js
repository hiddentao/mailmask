import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { font, flex } from 'emotion-styled-utils'

import { trackEvent } from '../../../analytics'
import { DeleteAccountMutation } from '../../../../graphql/mutations'
import { useSafeMutation } from '../../../hooks'
import Button from '../../Button'
import QueryResult from '../../QueryResult'
import TextInput from '../../TextInput'
import { Modal } from '../../Modal'

const Container = styled.div`
  p {
    margin: 1rem 0;
  }
`

const ModalContainer = styled.div`
  ${flex({ direction: 'column', justify: 'flex-start', align: 'center' })};
  width: 100%;
  height: 100%;
  padding: 2rem;

  p {
    ${font('body')};
    margin-bottom: 1rem;
  }

  strong {
    ${font('body', 'bold')};
  }

  input {
    margin: 1rem 0 2rem;
  }
`

const DeleteButton = styled(Button)`
  margin-top: 1rem;
`

const Account = ({ className }) => {
  const router = useRouter()

  const [ confirmDeleteModalOpen, setConfirmDeleteModalOpen ] = useState(false)
  const [ deleteConfirmationText, setDeleteConfirmationText ] = useState('')

  const [ doDeleteMutation, deleteAccountMutation ] = useSafeMutation(DeleteAccountMutation)

  const closeConfirmDeleteModal = useCallback(() => setConfirmDeleteModalOpen(false), [])
  const openConfirmDeleteModal = useCallback(() => setConfirmDeleteModalOpen(true), [])

  const deleteAccount = useCallback(async () => {
    trackEvent('dashboard', 'DeleteAccount')

    const { error } = await doDeleteMutation()

    if (!error) {
      router.replace('/')
    }
  }, [ router, doDeleteMutation ])

  return (
    <Container className={className}>
      <p>If you no longer wish to use Mailmask you can delete your account.</p>

      <DeleteButton onClick={openConfirmDeleteModal}>Delete account</DeleteButton>

      <Modal isOpen={confirmDeleteModalOpen} onBackgroundClick={closeConfirmDeleteModal}>
        <ModalContainer>

          <p>Please type <strong>DELETE</strong> below and click the button to confirm:</p>

          <TextInput
            size="20"
            type="text"
            value={deleteConfirmationText}
            onChange={setDeleteConfirmationText}
          />

          <Button onClick={deleteAccount} disabled={deleteConfirmationText !== 'DELETE'}>
            Confirm account deletion
          </Button>

          <QueryResult {...deleteAccountMutation} />
        </ModalContainer>
      </Modal>
    </Container>
  )
}

export default Account
