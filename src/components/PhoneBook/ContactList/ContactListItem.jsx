import React from 'react';
import { PhoneBookContactItem } from '../PhoneBookStyled';

export function ContactListItem({ contact }) {
  if (!contact) {
    return null;
  }
  return (
    <PhoneBookContactItem>
      {contact.name}: {contact.number}
    </PhoneBookContactItem>
  );
}
