import { Accordion } from '@aeon-ui/react';
import { ChevronDown } from 'lucide-react';
import { faq } from '../site';
import './Faq.css';

export function Faq() {
  return (
    <section id="faq" className="section faq">
      <div className="container faq__layout">
        <div className="faq__intro">
          <p className="section-label">FAQ</p>
          <h2 className="section-title">Straight answers.</h2>
          <p className="section-lead faq__lead">
            No agency fog. Common questions from local owners considering a site or refresh.
          </p>
        </div>

        <Accordion.Root className="faq__accordion panel" multiple collapsible>
          {faq.map((item) => (
            <Accordion.Item key={item.id} value={item.id} className="sc-accordion-item">
              <Accordion.ItemTrigger value={item.id} className="sc-accordion-trigger">
                {item.question}
                <Accordion.ItemIndicator className="sc-accordion-indicator">
                  <ChevronDown size={20} aria-hidden />
                </Accordion.ItemIndicator>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent value={item.id}>
                <div className="sc-accordion-body">{item.answer}</div>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
