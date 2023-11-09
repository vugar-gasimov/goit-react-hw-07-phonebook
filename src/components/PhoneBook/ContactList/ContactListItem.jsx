import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  ListItemContainer,
  DeleteButton,
  ButtonsContainer,
} from '../PhoneBookStyled';
import {
  deleteContactThunk,
  editContactThunk,
} from 'Redux/PhoneBook/operations';
import {
  selectDeletedId,
  selectError,
  selectLoading,
} from 'Redux/PhoneBook/selectors';
import { useModal } from 'components/Hooks/useModal';
import Modal from 'components/Modal/Modal';

export function ContactListItem({ contact }) {
  const [updatedName, setUpdatedName] = useState(contact.name);
  const [updatedNumber, setUpdatedNumber] = useState(contact.number);
  const curId = useSelector(selectDeletedId);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error, loading]);

  const handleChangeContact = contactId => {
    const updatedContact = {
      id: contact.id,
      name: updatedName,
      number: updatedNumber,
    };
    dispatch(editContactThunk(updatedContact));
    closeModal();
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleChangeContact();
    }
  };

  const { isOpen, openModal, closeModal } = useModal();

  if (!contact) {
    return null;
  }

  return (
    <ListItemContainer>
      {contact.name}: {contact.number}
      <ButtonsContainer>
        <DeleteButton onClick={openModal}>Open</DeleteButton>
        {isOpen ? (
          <Modal close={closeModal}>
            <form onSubmit={handleChangeContact} onKeyPress={handleKeyPress}>
              <input
                type="text"
                value={updatedName}
                onChange={e => setUpdatedName(e.target.value)}
              />
              <input
                type="tel"
                value={updatedNumber}
                onChange={e => setUpdatedNumber(e.target.value)}
              />
              <DeleteButton type="submit">Submit</DeleteButton>
            </form>
          </Modal>
        ) : null}

        <DeleteButton
          onClick={() => dispatch(deleteContactThunk(contact.id))}
          disabled={loading && curId === contact.id}
        >
          {loading && curId === contact.id ? 'Deleting...' : 'Delete'}
        </DeleteButton>
      </ButtonsContainer>
    </ListItemContainer>
  );
}
