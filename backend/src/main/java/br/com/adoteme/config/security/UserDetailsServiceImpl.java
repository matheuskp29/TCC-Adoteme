package br.com.adoteme.config.security;

import br.com.adoteme.model.entity.Cliente;
import br.com.adoteme.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Collections;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final ClienteRepository clienteRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Cliente cliente = clienteRepository.findByEmail(email).orElseThrow(EntityNotFoundException::new);

        return new User(cliente.getEmail(), cliente.getSenha(), getAuthority(cliente));
    }

    private Set<SimpleGrantedAuthority> getAuthority(Cliente cliente) {
        return Collections.singleton(new SimpleGrantedAuthority(cliente.getRole().getNome()));
    }
}
