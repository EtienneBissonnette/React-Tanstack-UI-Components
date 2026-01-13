import { DropdownMenu, Button } from '@/components/ui';
import { Settings, User, LogOut, HelpCircle, ChevronDown } from 'lucide-react';
import { DemoSection } from '../../DemoSection';

export function DropdownMenuDemo() {
  return (
    <DemoSection title="Dropdown Menu">
      <div className="demo-section__row">
        <DropdownMenu>
          <DropdownMenu.Trigger>
            <Button>
              Basic Menu
              <ChevronDown size={14} />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item onSelect={() => console.log('Profile')}>
              <User size={16} />
              Profile
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={() => console.log('Settings')}>
              <Settings size={16} />
              Settings
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={() => console.log('Help')}>
              <HelpCircle size={16} />
              Help
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item intent="danger" onSelect={() => console.log('Logout')}>
              <LogOut size={16} />
              Log out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenu.Trigger>
            <Button intent="primary">
              With Groups
              <ChevronDown size={14} />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="start">
            <DropdownMenu.Group label="Account">
              <DropdownMenu.Item>Profile</DropdownMenu.Item>
              <DropdownMenu.Item>Settings</DropdownMenu.Item>
            </DropdownMenu.Group>
            <DropdownMenu.Separator />
            <DropdownMenu.Group label="Actions">
              <DropdownMenu.Item>New Project</DropdownMenu.Item>
              <DropdownMenu.Item>Import Data</DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenu.Trigger>
            <Button intent="secondary">
              Alignment
              <ChevronDown size={14} />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content side="bottom" align="end">
            <DropdownMenu.Item>Aligned to end</DropdownMenu.Item>
            <DropdownMenu.Item>Second option</DropdownMenu.Item>
            <DropdownMenu.Item>Third option</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      </div>

      <div className="demo-section__row">
        <DropdownMenu>
          <DropdownMenu.Trigger>
            <Button>
              With Disabled
              <ChevronDown size={14} />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Enabled item</DropdownMenu.Item>
            <DropdownMenu.Item disabled>Disabled item</DropdownMenu.Item>
            <DropdownMenu.Item>Another enabled</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      </div>
    </DemoSection>
  );
}
