"use client";

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import styles from './helpButton.module.css';
import { ChatIcon } from './icons/chatIcon';
import * as Popover from '@radix-ui/react-popover';
import { CloseIcon } from './icons/closeIcon';
import { SlackIcon } from './icons/slackIcon';
import { BookIcon } from './icons/bookIcon';
import { ChatAltIcon } from './icons/chatAltIcon';
import { ContactForm } from './contactForm';

function LinkRow(props: {
  label: string;
  icon: React.ReactNode;
  href: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <a className={styles.linkRow} href={props.href} onClick={props.onClick}>
      <div className={styles.linkRowIcon}>{props.icon}</div>
      {props.label}
    </a>
  );
}

export function HelpButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  useEffect(() => {
    if (!isOpen && isContactFormOpen) {
      setIsContactFormOpen(false);
    }
  }, [isOpen, isContactFormOpen]);

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button className={styles.helpButton}>
          {isOpen ? <CloseIcon width={24} /> : <ChatIcon width={24} />}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={clsx(styles.popoverContent, {
            [styles.popoverContentLarge]: isContactFormOpen,
          })}
          sideOffset={12}
          collisionPadding={20}
          side="top"
          align="end"
        >
          {isContactFormOpen ? (
            <ContactForm
              onSubmit={() => {
                setIsOpen(false);
              }}
            />
          ) : (
            <>
              <h4 className={styles.popoverTitle}>Need help?</h4>
              <p className={styles.popoverNudge}>
                Psss... Slack is great if you want a quick reply from our community!
              </p>
              <LinkRow label="Join on Slack" href="https://join.slack.com/t/joblessdev/shared_invite/zt-2gwopb39y-9XzMearVJQEVa46lvsQVdg" icon={<SlackIcon />} />
              <LinkRow
                label="Get in touch"
                href="#"
                icon={<ChatAltIcon />}
                onClick={(e) => {
                  e.preventDefault();
                  setIsContactFormOpen(true);
                }}
              />
            </>
          )}

          <Popover.Arrow className={styles.popoverArrow} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
