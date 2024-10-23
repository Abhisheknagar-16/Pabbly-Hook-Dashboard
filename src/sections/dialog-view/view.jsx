import { AlertDialog } from './alert-dialog';
import { ScrollDialog } from './scroll-dialog';
import { SimpleDialog } from './simple-dialog';
import { MaxWidthDialog } from './max-width-dialog';
import { FullScreenDialog } from './full-screen-dialog';
import { TransitionsDialog } from './transitions-dialog';
import { ComponentBlock, ComponentContainer } from '../component-block';
import { CreateConnectionFormDialog } from './create-connection-form-dialog';
// ----------------------------------------------------------------------

export function DialogView() {
  return (
    <ComponentContainer
        sx={{
          rowGap: 5,
          columnGap: 3,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
        }}
      >
        <ComponentBlock title="Simple">
          <SimpleDialog />
        </ComponentBlock>

        <ComponentBlock title="Alerts">
          <AlertDialog />
        </ComponentBlock>

        <ComponentBlock title="Transitions">
          <TransitionsDialog />
        </ComponentBlock>

        <ComponentBlock title="Form">
          <CreateConnectionFormDialog />
        </ComponentBlock>

        <ComponentBlock title="Full Screen">
          <FullScreenDialog />
        </ComponentBlock>

        <ComponentBlock title="Max width dialog">
          <MaxWidthDialog />
        </ComponentBlock>

        <ComponentBlock title="Scrolling content dialogs">
          <ScrollDialog />
        </ComponentBlock>
      </ComponentContainer>
  );
}
