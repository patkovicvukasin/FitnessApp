import SockJS from 'sockjs-client';
import { Client, type IMessage } from '@stomp/stompjs';

class WebSocketService {
  private client: Client | null = null;
  private subscriptions: Map<string, any> = new Map();
  private isConnected: boolean = false;
  private connectPromise: Promise<void> | null = null;

  connect(): Promise<void> {
    if (this.isConnected && this.client?.connected) {
      return Promise.resolve();
    }
    if (this.connectPromise) {
      return this.connectPromise;
    }

    this.connectPromise = new Promise((resolve, reject) => {
      this.client = new Client({
        webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
          this.isConnected = true;
          this.connectPromise = null;
          resolve();
        },
        onDisconnect: () => {
          this.isConnected = false;
        },
        onStompError: (frame) => {
          console.error('STOMP error:', frame);
          this.isConnected = false;
          this.connectPromise = null;
          reject(new Error('STOMP error'));
        },
      });

      this.client.activate();
    });

    return this.connectPromise;
  }

  disconnect() {
    if (this.client) {
      this.subscriptions.forEach((sub) => sub.unsubscribe());
      this.subscriptions.clear();
      this.client.deactivate();
      this.client = null;
      this.isConnected = false;
      this.connectPromise = null;
    }
  }

  subscribeToSessionCapacity(
    sessionId: number,
    callback: (data: { sessionId: number; availableSlots: number; maxCapacity: number }) => void
  ): (() => void) | undefined {
    if (!this.isConnected || !this.client?.connected) {
      return undefined;
    }

    const topic = `/topic/sessions/${sessionId}/capacity`;
    
    if (this.subscriptions.has(topic)) {
      return undefined;
    }

    const subscription = this.client.subscribe(topic, (message: IMessage) => {
      const data = JSON.parse(message.body);
      callback(data);
    });

    this.subscriptions.set(topic, subscription);

    return () => {
      subscription.unsubscribe();
      this.subscriptions.delete(topic);
    };
  }

  subscribeToSessionDeletion(
    sessionId: number,
    callback: (sessionId: number) => void
  ): (() => void) | undefined {
    if (!this.isConnected || !this.client?.connected) {
      return undefined;
    }

    const topic = `/topic/sessions/${sessionId}/deleted`;
    
    if (this.subscriptions.has(topic)) {
      return undefined;
    }

    const subscription = this.client.subscribe(topic, (message: IMessage) => {
      const deletedId = JSON.parse(message.body);
      callback(deletedId);
    });

    this.subscriptions.set(topic, subscription);

    return () => {
      subscription.unsubscribe();
      this.subscriptions.delete(topic);
    };
  }
}

export const websocketService = new WebSocketService();