import {  screen } from '@testing-library/react';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import ConditionalComponent from '../src/Component/test';
import FilterComponent from '../src/Component/Filter';



describe('ConditionalComponent', () => {
  it('renders "Welcome, User!" when isLoggedIn is true', () => {
    const { getByText } = render(<ConditionalComponent isLoggedIn={true} />);
    const welcomeMessage = getByText('Welcome, User!');
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('renders "Please log in to continue." when isLoggedIn is false', () => {
    const { getByText } = render(<ConditionalComponent isLoggedIn={false} />);
    const loginMessage = getByText('Please log in to continue.');
    expect(loginMessage).toBeInTheDocument();
  });
});



describe('FilterComponent', () => {
  it('renders filter input and data list', () => {
    const testData = ['Apple', 'Banana', 'Orange'];
    const { getByPlaceholderText, getByText } = render(
      <FilterComponent data={testData} />
    );

    const filterInput = getByPlaceholderText('Filter data...');
    expect(filterInput).toBeInTheDocument();

    testData.forEach(item => {
      const listItem = getByText(item);
      expect(listItem).toBeInTheDocument();
    });
  });

  it('filters data based on input', () => {
    const testData = ['Apple', 'Banana', 'Orange'];
    const { getByPlaceholderText, getByText, queryByText } = render(
      <FilterComponent data={testData} />
    );

    const filterInput = getByPlaceholderText('Filter data...');
    fireEvent.change(filterInput, { target: { value: 'apple' } });

    expect(getByText('Apple')).toBeInTheDocument();
    expect(queryByText('Banana')).not.toBeInTheDocument();
    expect(queryByText('Orange')).not.toBeInTheDocument();
  });
});