import React, { useEffect } from 'react';
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

export function ContactListItem({ contact }) {
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
      id: contactId,
      name: prompt('Enter new name') || contact.name,
      number: prompt('Enter new number') || contact.number,
    };
    dispatch(editContactThunk(updatedContact));
  };
  if (!contact) {
    return null;
  }

  return (
    <ListItemContainer>
      {contact.name}: {contact.number}
      <ButtonsContainer>
        <DeleteButton onClick={() => handleChangeContact(contact.id)}>
          Edit
        </DeleteButton>
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
